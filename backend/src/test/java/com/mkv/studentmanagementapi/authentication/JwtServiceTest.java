package com.mkv.studentmanagementapi.authentication;

import com.mkv.studentmanagementapi.authentication.service.jwt.JwtService;
import com.mkv.studentmanagementapi.common.config.JwtConfig;
import com.mkv.studentmanagementapi.student.entity.Student;
import com.mkv.studentmanagementapi.user.entity.Role;
import com.mkv.studentmanagementapi.user.entity.Roles;
import com.mkv.studentmanagementapi.user.entity.User;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JwtServiceTest {

    @Mock JwtConfig jwtConfig;

    @InjectMocks JwtService jwtService;

    // 32+ byte secret required for HS256
    private static final String SECRET = "this-is-a-test-secret-key-32bytes!";
    private User user;

    @BeforeEach
    void setUp() {
        var role = new Role();
        role.setName(Roles.STUDENT);

        var student = new Student();
        student.setFirstName("John");
        student.setLastName("Doe");

        user = new User();
        user.setId(UUID.randomUUID());
        user.setEmail("john@example.com");
        user.setPassword("encoded");
        user.setRoles(Set.of(role));
        user.setStudent(student);

        when(jwtConfig.getSecretKey()).thenReturn(Keys.hmacShaKeyFor(SECRET.getBytes()));
    }

    @Test
    void generateAccessToken_returnsNonNullToken() {
        when(jwtConfig.getAccessTokenExpiration()).thenReturn(7200);

        var jwt = jwtService.generateAccessToken(user);

        assertThat(jwt).isNotNull();
        assertThat(jwt.toString()).isNotBlank();
    }

    @Test
    void generateAccessToken_tokenContainsCorrectUserId() {
        when(jwtConfig.getAccessTokenExpiration()).thenReturn(7200);

        var jwt = jwtService.generateAccessToken(user);

        assertThat(jwt.getUserId()).isEqualTo(user.getId());
    }

    @Test
    void generateAccessToken_tokenContainsCorrectRole() {
        when(jwtConfig.getAccessTokenExpiration()).thenReturn(7200);

        var jwt = jwtService.generateAccessToken(user);

        assertThat(jwt.getRoles()).containsExactly(Roles.STUDENT);
    }

    @Test
    void generateAccessToken_tokenIsNotExpired() {
        when(jwtConfig.getAccessTokenExpiration()).thenReturn(7200);

        var jwt = jwtService.generateAccessToken(user);

        assertThat(jwt.isExpired()).isFalse();
    }

    @Test
    void generateAccessToken_tokenIsExpired_whenExpirationIsZero() {
        when(jwtConfig.getAccessTokenExpiration()).thenReturn(0);

        var jwt = jwtService.generateAccessToken(user);

        assertThat(jwt.isExpired()).isTrue();
    }

    @Test
    void parseToken_returnsJwt_forValidToken() {
        when(jwtConfig.getAccessTokenExpiration()).thenReturn(7200);

        var generated = jwtService.generateAccessToken(user);
        var parsed = jwtService.parseToken(generated.toString());

        assertThat(parsed).isNotNull();
        assertThat(parsed.getUserId()).isEqualTo(user.getId());
    }

    @Test
    void parseToken_returnsNull_forTamperedToken() {
        when(jwtConfig.getAccessTokenExpiration()).thenReturn(7200);

        var generated = jwtService.generateAccessToken(user);
        var tampered = generated.toString() + "tampered";

        var result = jwtService.parseToken(tampered);

        assertThat(result).isNull();
    }

    @Test
    void parseToken_returnsNull_forCompletelyInvalidToken() {
        var result = jwtService.parseToken("not.a.jwt");

        assertThat(result).isNull();
    }

    @Test
    void parseToken_returnsNull_forEmptyString() {
        var result = jwtService.parseToken("");

        assertThat(result).isNull();
    }

    @Test
    void generateAccessToken_multipleRoles_allParsedCorrectly() {
        var adminRole = new Role();
        adminRole.setName(Roles.ADMIN);
        var studentRole = new Role();
        studentRole.setName(Roles.STUDENT);
        user.setRoles(Set.of(adminRole, studentRole));

        when(jwtConfig.getAccessTokenExpiration()).thenReturn(7200);

        var jwt = jwtService.generateAccessToken(user);

        assertThat(jwt.getRoles()).containsExactlyInAnyOrder(Roles.ADMIN, Roles.STUDENT);
    }
}
