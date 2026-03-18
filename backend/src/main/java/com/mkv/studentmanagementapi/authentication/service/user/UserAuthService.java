package com.mkv.studentmanagementapi.authentication.service.user;

import com.mkv.studentmanagementapi.authentication.dto.JwtResponse;
import com.mkv.studentmanagementapi.authentication.service.jwt.JwtService;
import com.mkv.studentmanagementapi.user.dto.*;
import com.mkv.studentmanagementapi.user.entity.Roles;
import com.mkv.studentmanagementapi.user.exception.DuplicateEmailException;
import com.mkv.studentmanagementapi.user.exception.RoleNotFoundException;
import com.mkv.studentmanagementapi.user.mapper.RegistrationMapper;
import com.mkv.studentmanagementapi.user.repository.RoleRepository;
import com.mkv.studentmanagementapi.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class UserAuthService {

    private static final Logger logger = LoggerFactory.getLogger(UserAuthService.class);

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RegistrationMapper registrationMapper;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Transactional
    public RegistrationResponse register(RegistrationRequest request) {
        userRepository.existsByEmail(request.getEmail()).orElseThrow(DuplicateEmailException::new);

        var role = roleRepository.findByName(Roles.STUDENT).orElseThrow(RoleNotFoundException::new);

        var user = registrationMapper.toUserEntity(request);
        var student = registrationMapper.toStudentEntity(request);

        user.assignStudentAndRole(student, role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        logger.info("Registered new user with email {}", request.getEmail());

        return registrationMapper.toDto(user);
    }

    public JwtResponse login(LoginUserRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var accessToken = jwtService.generateAccessToken(user);

        logger.info("User {} logged in", request.getEmail());

        return new JwtResponse(accessToken.toString());
    }

}
