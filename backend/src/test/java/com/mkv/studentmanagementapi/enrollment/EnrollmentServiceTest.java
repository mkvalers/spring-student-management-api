package com.mkv.studentmanagementapi.enrollment;

import com.mkv.studentmanagementapi.course.entity.Course;
import com.mkv.studentmanagementapi.course.exception.CourseNotFoundException;
import com.mkv.studentmanagementapi.course.repository.CourseRepository;
import com.mkv.studentmanagementapi.enrollment.dto.EnrollmentDto;
import com.mkv.studentmanagementapi.enrollment.dto.EnrollmentRequest;
import com.mkv.studentmanagementapi.enrollment.dto.EnrollmentResponse;
import com.mkv.studentmanagementapi.enrollment.entity.Enrollment;
import com.mkv.studentmanagementapi.enrollment.exception.EnrollmentNotFoundException;
import com.mkv.studentmanagementapi.enrollment.exception.StudentAlreadyEnrolledException;
import com.mkv.studentmanagementapi.enrollment.mapper.EnrollmentMapper;
import com.mkv.studentmanagementapi.enrollment.repository.EnrollmentRepository;
import com.mkv.studentmanagementapi.enrollment.service.EnrollmentService;
import com.mkv.studentmanagementapi.student.entity.Student;
import com.mkv.studentmanagementapi.student.exception.StudentNotFoundException;
import com.mkv.studentmanagementapi.student.repository.StudentRepository;
import com.mkv.studentmanagementapi.user.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EnrollmentServiceTest {

    @Mock StudentRepository studentRepository;
    @Mock CourseRepository courseRepository;
    @Mock EnrollmentRepository enrollmentRepository;
    @Mock EnrollmentMapper enrollmentMapper;

    @InjectMocks EnrollmentService enrollmentService;

    private UUID userId;
    private Student student;
    private Course course;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();

        var user = new User();
        user.setId(userId);
        user.setEmail("john@example.com");

        student = new Student();
        student.setId(1L);
        student.setFirstName("John");
        student.setLastName("Doe");
        student.setUser(user);

        course = new Course();
        course.setId(10L);
        course.setCourseCode("CS101");
        course.setCourseName("Intro to CS");

        var auth = new UsernamePasswordAuthenticationToken(userId.toString(), null, List.of());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    // --- enrollStudent ---

    @Test
    void enrollStudent_success() {
        var request = new EnrollmentRequest();
        request.setCourseId(10L);

        var enrollment = new Enrollment(student, course);
        var dto = new EnrollmentDto();
        dto.setStudentName("John Doe");
        dto.setCourseName("Intro to CS");

        when(enrollmentRepository.existsByStudentUserIdAndCourseId(userId, 10L)).thenReturn(false);
        when(studentRepository.findByUserId(userId)).thenReturn(Optional.of(student));
        when(courseRepository.findById(10L)).thenReturn(Optional.of(course));
        when(enrollmentMapper.toDto(any(Enrollment.class))).thenReturn(dto);

        var result = enrollmentService.enrollStudent(request);

        assertThat(result.getStudentName()).isEqualTo("John Doe");
        assertThat(result.getCourseName()).isEqualTo("Intro to CS");
        verify(enrollmentRepository).save(any(Enrollment.class));
    }

    @Test
    void enrollStudent_throwsStudentAlreadyEnrolledException_whenAlreadyEnrolled() {
        var request = new EnrollmentRequest();
        request.setCourseId(10L);

        when(enrollmentRepository.existsByStudentUserIdAndCourseId(userId, 10L)).thenReturn(true);

        assertThatThrownBy(() -> enrollmentService.enrollStudent(request))
                .isInstanceOf(StudentAlreadyEnrolledException.class);

        verify(enrollmentRepository, never()).save(any());
    }

    @Test
    void enrollStudent_throwsCourseNotFoundException_whenCourseDoesNotExist() {
        var request = new EnrollmentRequest();
        request.setCourseId(99L);

        when(enrollmentRepository.existsByStudentUserIdAndCourseId(userId, 99L)).thenReturn(false);
        when(studentRepository.findByUserId(userId)).thenReturn(Optional.of(student));
        when(courseRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> enrollmentService.enrollStudent(request))
                .isInstanceOf(CourseNotFoundException.class);

        verify(enrollmentRepository, never()).save(any());
    }

    // --- getLoggedInStudentEnrollments ---

    @Test
    void getLoggedInStudentEnrollments_returnsEnrollments() {
        var enrollment = new Enrollment(student, course);
        var response = new EnrollmentResponse();
        response.setCourseName("Intro to CS");

        when(studentRepository.findByUserId(userId)).thenReturn(Optional.of(student));
        when(enrollmentRepository.findAllByStudentId(1L)).thenReturn(List.of(enrollment));
        when(enrollmentMapper.toResponse(enrollment)).thenReturn(response);

        var result = (List<EnrollmentResponse>) enrollmentService.getLoggedInStudentEnrollments();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getCourseName()).isEqualTo("Intro to CS");
    }

    @Test
    void getLoggedInStudentEnrollments_returnsEmptyList_whenNotEnrolledInAnyCourse() {
        when(studentRepository.findByUserId(userId)).thenReturn(Optional.of(student));
        when(enrollmentRepository.findAllByStudentId(1L)).thenReturn(List.of());

        var result = (List<EnrollmentResponse>) enrollmentService.getLoggedInStudentEnrollments();

        assertThat(result).isEmpty();
    }

    @Test
    void getLoggedInStudentEnrollments_throwsStudentNotFoundException_whenStudentNotFound() {
        when(studentRepository.findByUserId(userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> enrollmentService.getLoggedInStudentEnrollments())
                .isInstanceOf(StudentNotFoundException.class);
    }

    // --- dropCourse ---

    @Test
    void dropCourse_success() {
        var enrollment = new Enrollment(student, course);
        enrollment.setId(5L);

        when(studentRepository.findByUserId(userId)).thenReturn(Optional.of(student));
        when(enrollmentRepository.findByIdAndStudentId(5L, 1L)).thenReturn(Optional.of(enrollment));

        enrollmentService.dropCourse(5L);

        verify(enrollmentRepository).delete(enrollment);
    }

    @Test
    void dropCourse_throwsStudentNotFoundException_whenStudentNotFound() {
        when(studentRepository.findByUserId(userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> enrollmentService.dropCourse(5L))
                .isInstanceOf(StudentNotFoundException.class);

        verify(enrollmentRepository, never()).delete(any());
    }

    @Test
    void dropCourse_throwsEnrollmentNotFoundException_whenEnrollmentDoesNotBelongToStudent() {
        when(studentRepository.findByUserId(userId)).thenReturn(Optional.of(student));
        when(enrollmentRepository.findByIdAndStudentId(5L, 1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> enrollmentService.dropCourse(5L))
                .isInstanceOf(EnrollmentNotFoundException.class);

        verify(enrollmentRepository, never()).delete(any());
    }
}
