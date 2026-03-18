package com.mkv.studentmanagementapi.authentication;

import com.mkv.studentmanagementapi.authentication.service.jwt.Jwt;
import com.mkv.studentmanagementapi.authentication.service.jwt.JwtService;
import com.mkv.studentmanagementapi.authentication.service.user.UserAuthService;
import com.mkv.studentmanagementapi.user.dto.LoginUserRequest;
import com.mkv.studentmanagementapi.user.dto.RegistrationRequest;
import com.mkv.studentmanagementapi.user.dto.RegistrationResponse;
import com.mkv.studentmanagementapi.user.entity.Role;
import com.mkv.studentmanagementapi.user.entity.Roles;
import com.mkv.studentmanagementapi.user.entity.User;
import com.mkv.studentmanagementapi.user.exception.DuplicateEmailException;
import com.mkv.studentmanagementapi.user.exception.RoleNotFoundException;
import com.mkv.studentmanagementapi.user.mapper.RegistrationMapper;
import com.mkv.studentmanagementapi.user.repository.RoleRepository;
import com.mkv.studentmanagementapi.user.repository.UserRepository;
import com.mkv.studentmanagementapi.student.entity.Student;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserAuthServiceTest {

    @Mock AuthenticationManager authenticationManager;
    @Mock PasswordEncoder passwordEncoder;
    @Mock JwtService jwtService;
    @Mock RegistrationMapper registrationMapper;
    @Mock UserRepository userRepository;
    @Mock RoleRepository roleRepository;

    @InjectMocks UserAuthService userAuthService;

    private User user;
    private Student student;
    private Role studentRole;
    private RegistrationRequest registrationRequest;

    @BeforeEach
    void setUp() {
        studentRole = new Role();
        studentRole.setName(Roles.STUDENT);

        student = new Student();
        student.setFirstName("John");
        student.setLastName("Doe");
        student.setYearLevel(1);

        user = new User();
        user.setId(UUID.randomUUID());
        user.setEmail("john@example.com");
        user.setPassword("plainPassword");
        user.assignStudentAndRole(student, studentRole);

        registrationRequest = new RegistrationRequest();
        registrationRequest.setEmail("john@example.com");
        registrationRequest.setPassword("password123");
        registrationRequest.setFirstName("John");
        registrationRequest.setLastName("Doe");
        registrationRequest.setYearLevel(1);
    }

    // --- register ---

    @Test
    void register_success() {
        var response = new RegistrationResponse();
        response.setEmail("john@example.com");

        // Optional.empty() = email not found = no duplicate, proceed
        when(userRepository.existsByEmail(registrationRequest.getEmail())).thenReturn(Optional.of(false));
        when(roleRepository.findByName(Roles.STUDENT)).thenReturn(Optional.of(studentRole));
        when(registrationMapper.toUserEntity(registrationRequest)).thenReturn(user);
        when(registrationMapper.toStudentEntity(registrationRequest)).thenReturn(student);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(registrationMapper.toDto(user)).thenReturn(response);

        var result = userAuthService.register(registrationRequest);

        assertThat(result.getEmail()).isEqualTo("john@example.com");
        verify(userRepository).save(user);
        verify(passwordEncoder).encode(anyString());
    }

    @Test
    void register_throwsDuplicateEmailException_whenEmailAlreadyExists() {
        // Optional.empty() = orElseThrow fires = DuplicateEmailException
        when(userRepository.existsByEmail(registrationRequest.getEmail()))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> userAuthService.register(registrationRequest))
                .isInstanceOf(DuplicateEmailException.class);

        verify(userRepository, never()).save(any());
    }

    @Test
    void register_throwsRoleNotFoundException_whenStudentRoleNotFound() {
        when(userRepository.existsByEmail(registrationRequest.getEmail())).thenReturn(Optional.of(false));
        when(roleRepository.findByName(Roles.STUDENT)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userAuthService.register(registrationRequest))
                .isInstanceOf(RoleNotFoundException.class);

        verify(userRepository, never()).save(any());
    }

    @Test
    void register_encodesPasswordBeforeSaving() {
        when(userRepository.existsByEmail(anyString())).thenReturn(Optional.of(false));
        when(roleRepository.findByName(Roles.STUDENT)).thenReturn(Optional.of(studentRole));
        when(registrationMapper.toUserEntity(registrationRequest)).thenReturn(user);
        when(registrationMapper.toStudentEntity(registrationRequest)).thenReturn(student);
        when(passwordEncoder.encode("plainPassword")).thenReturn("encodedPassword");
        when(registrationMapper.toDto(user)).thenReturn(new RegistrationResponse());

        userAuthService.register(registrationRequest);

        assertThat(user.getPassword()).isEqualTo("encodedPassword");
    }

    // --- login ---

    @Test
    void login_success_returnsJwtToken() {
        var request = new LoginUserRequest();
        request.setEmail("john@example.com");
        request.setPassword("password123");

        var mockJwt = mock(Jwt.class);
        when(mockJwt.toString()).thenReturn("mocked.jwt.token");

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(jwtService.generateAccessToken(user)).thenReturn(mockJwt);

        var result = userAuthService.login(request);

        assertThat(result.getToken()).isEqualTo("mocked.jwt.token");
    }

    @Test
    void login_throwsBadCredentialsException_whenCredentialsAreWrong() {
        var request = new LoginUserRequest();
        request.setEmail("john@example.com");
        request.setPassword("wrongPassword");

        doThrow(new BadCredentialsException("Bad credentials"))
                .when(authenticationManager)
                .authenticate(any(UsernamePasswordAuthenticationToken.class));

        assertThatThrownBy(() -> userAuthService.login(request))
                .isInstanceOf(BadCredentialsException.class);

        verify(jwtService, never()).generateAccessToken(any());
    }

    @Test
    void login_callsAuthenticationManagerWithCorrectCredentials() {
        var request = new LoginUserRequest();
        request.setEmail("john@example.com");
        request.setPassword("password123");

        var mockJwt = mock(Jwt.class);
        when(mockJwt.toString()).thenReturn("token");
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(jwtService.generateAccessToken(user)).thenReturn(mockJwt);

        userAuthService.login(request);

        verify(authenticationManager).authenticate(
                new UsernamePasswordAuthenticationToken("john@example.com", "password123")
        );
    }
}
