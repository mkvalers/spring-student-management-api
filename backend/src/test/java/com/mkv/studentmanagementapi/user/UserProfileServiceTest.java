package com.mkv.studentmanagementapi.user;

import com.mkv.studentmanagementapi.student.dto.StudentResponse;
import com.mkv.studentmanagementapi.student.entity.Student;
import com.mkv.studentmanagementapi.student.mapper.StudentMapper;
import com.mkv.studentmanagementapi.student.repository.StudentRepository;
import com.mkv.studentmanagementapi.user.dto.AdminResponse;
import com.mkv.studentmanagementapi.user.dto.AdminUpdateRequest;
import com.mkv.studentmanagementapi.user.dto.UpdateInfoRequest;
import com.mkv.studentmanagementapi.user.entity.User;
import com.mkv.studentmanagementapi.user.mapper.UserMapper;
import com.mkv.studentmanagementapi.user.repository.UserRepository;
import com.mkv.studentmanagementapi.user.service.UserProfileService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserProfileServiceTest {

    @Mock PasswordEncoder passwordEncoder;
    @Mock UserMapper userMapper;
    @Mock StudentMapper studentMapper;
    @Mock UserRepository userRepository;
    @Mock StudentRepository studentRepository;

    @InjectMocks UserProfileService userProfileService;

    private UUID userId;
    private User user;
    private Student student;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();

        user = new User();
        user.setId(userId);
        user.setEmail("john@example.com");
        user.setPassword("encodedOldPassword");

        student = new Student();
        student.setId(1L);
        student.setFirstName("John");
        student.setLastName("Doe");
        student.setUser(user);

        var auth = new UsernamePasswordAuthenticationToken(userId.toString(), null, List.of());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    // --- getStudentProfile ---

    @Test
    void getStudentProfile_returnsStudentResponse() {
        var response = new StudentResponse();
        response.setName("John Doe");
        response.setYearLevel(2);

        when(studentRepository.findByUserId(userId)).thenReturn(Optional.of(student));
        when(studentMapper.toStudentResponse(student)).thenReturn(response);

        var result = userProfileService.getStudentProfile();

        assertThat(result.getName()).isEqualTo("John Doe");
        assertThat(result.getYearLevel()).isEqualTo(2);
    }

    @Test
    void getStudentProfile_throwsException_whenStudentNotFound() {
        when(studentRepository.findByUserId(userId)).thenReturn(Optional.empty());

        org.assertj.core.api.Assertions.assertThatThrownBy(() -> userProfileService.getStudentProfile())
                .isInstanceOf(java.util.NoSuchElementException.class);
    }

    // --- getAdminProfile ---

    @Test
    void getAdminProfile_returnsAdminResponse() {
        var response = new AdminResponse();
        response.setEmail("admin@example.com");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userMapper.toAdminDto(user)).thenReturn(response);

        var result = userProfileService.getAdminProfile();

        assertThat(result.getEmail()).isEqualTo("admin@example.com");
    }

    @Test
    void getAdminProfile_throwsException_whenAdminNotFound() {
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        org.assertj.core.api.Assertions.assertThatThrownBy(() -> userProfileService.getAdminProfile())
                .isInstanceOf(java.util.NoSuchElementException.class);
    }

    // --- updateStudentInfo ---

    @Test
    void updateStudentInfo_encodesAndSetsNewPassword_whenPasswordProvided() {
        var request = new UpdateInfoRequest();
        request.setEmail("newemail@example.com");
        request.setPassword("newPassword123");

        when(studentRepository.findByUserId(userId)).thenReturn(Optional.of(student));
        when(passwordEncoder.encode("newPassword123")).thenReturn("encodedNewPassword");

        userProfileService.updateStudentInfo(request);

        verify(passwordEncoder).encode("newPassword123");
        assertThat(user.getPassword()).isEqualTo("encodedNewPassword");
        verify(studentMapper).update(request, student);
        verify(studentRepository).save(student);
    }

    @Test
    void updateStudentInfo_doesNotEncodePassword_whenPasswordIsNull() {
        var request = new UpdateInfoRequest();
        request.setEmail("newemail@example.com");
        request.setPassword(null);

        when(studentRepository.findByUserId(userId)).thenReturn(Optional.of(student));

        userProfileService.updateStudentInfo(request);

        verify(passwordEncoder, never()).encode(any());
        verify(studentRepository).save(student);
    }

    @Test
    void updateStudentInfo_callsMapperUpdate() {
        var request = new UpdateInfoRequest();
        request.setEmail("newemail@example.com");
        request.setPassword(null);

        when(studentRepository.findByUserId(userId)).thenReturn(Optional.of(student));

        userProfileService.updateStudentInfo(request);

        verify(studentMapper).update(request, student);
    }

    // --- updateAdminPassword ---

    @Test
    void updateAdminPassword_encodesAndSavesNewPassword() {
        var request = new AdminUpdateRequest();
        request.setPassword("newAdminPass123");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode("newAdminPass123")).thenReturn("encodedAdminPass");

        userProfileService.updateAdminPassword(request);

        assertThat(user.getPassword()).isEqualTo("encodedAdminPass");
        verify(userRepository).save(user);
    }

    @Test
    void updateAdminPassword_throwsException_whenAdminNotFound() {
        var request = new AdminUpdateRequest();
        request.setPassword("newAdminPass123");

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        org.assertj.core.api.Assertions.assertThatThrownBy(() -> userProfileService.updateAdminPassword(request))
                .isInstanceOf(java.util.NoSuchElementException.class);

        verify(userRepository, never()).save(any());
    }

    @Test
    void updateAdminPassword_doesNotAffectOtherUserFields() {
        var request = new AdminUpdateRequest();
        request.setPassword("newAdminPass123");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode("newAdminPass123")).thenReturn("encodedAdminPass");

        userProfileService.updateAdminPassword(request);

        assertThat(user.getEmail()).isEqualTo("john@example.com");
    }
}
