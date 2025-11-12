package com.mkv.studentmanagementapi.user.service;

import com.mkv.studentmanagementapi.user.dto.*;
import com.mkv.studentmanagementapi.user.entity.Roles;
import com.mkv.studentmanagementapi.user.exception.DuplicateEmailException;
import com.mkv.studentmanagementapi.user.exception.RoleNotFoundException;
import com.mkv.studentmanagementapi.user.exception.AccessTokenNotValidException;
import com.mkv.studentmanagementapi.user.mapper.RegistrationMapper;
import com.mkv.studentmanagementapi.user.repository.RoleRepository;
import com.mkv.studentmanagementapi.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserAuthService {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserAuthUtils userAuthUtils;
    private final RegistrationMapper registrationMapper;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public RegistrationResponse register(RegistrationRequest request) {
        if(userRepository.existsByEmail(request.getEmail()))
            throw new DuplicateEmailException();

        var role = roleRepository.findByName(Roles.STUDENT).orElseThrow(RoleNotFoundException::new);

        var user = registrationMapper.toUserEntity(request);
        var student = registrationMapper.toStudentEntity(request);

        user.assignStudentAndRole(student, role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        return registrationMapper.toDto(user);
    }

    public JwtResponse login(LoginUserRequest request, HttpServletResponse response) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
                )
            );

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();

        var accessToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        userAuthUtils.createCookie(response, refreshToken);

        return new JwtResponse(accessToken.toString());
    }

    public void logout(HttpServletResponse response) {
        userAuthUtils.DestroyCookie(response);
    }

    public JwtResponse refresh(String refreshToken) {
        var jwt = jwtService.parseToken(refreshToken);

        if (jwt == null || jwt.isExpired()) {
            throw new AccessTokenNotValidException();
        }

        var user = userRepository.findById(jwt.getUserId()).orElseThrow();
        var accessToken = jwtService.generateAccessToken(user);

        return new JwtResponse(accessToken.toString());
    }

}
