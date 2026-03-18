package com.mkv.studentmanagementapi.course;

import com.mkv.studentmanagementapi.course.dto.CourseResponse;
import com.mkv.studentmanagementapi.course.dto.CreateCourseRequest;
import com.mkv.studentmanagementapi.course.dto.UpdateCourseRequest;
import com.mkv.studentmanagementapi.course.entity.Course;
import com.mkv.studentmanagementapi.course.exception.CourseNotFoundException;
import com.mkv.studentmanagementapi.course.exception.DuplicateCourseExceptionException;
import com.mkv.studentmanagementapi.course.mapper.CourseMapper;
import com.mkv.studentmanagementapi.course.repository.CourseRepository;
import com.mkv.studentmanagementapi.course.service.CourseService;
import com.mkv.studentmanagementapi.enrollment.entity.Enrollment;
import com.mkv.studentmanagementapi.enrollment.repository.EnrollmentRepository;
import com.mkv.studentmanagementapi.student.dto.StudentResponse;
import com.mkv.studentmanagementapi.student.entity.Student;
import com.mkv.studentmanagementapi.student.mapper.StudentMapper;
import com.mkv.studentmanagementapi.user.entity.Roles;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CourseServiceTest {

    @Mock CourseMapper courseMapper;
    @Mock CourseRepository courseRepository;
    @Mock EnrollmentRepository enrollmentRepository;
    @Mock StudentMapper studentMapper;

    @InjectMocks CourseService courseService;

    private Course course;
    private CourseResponse courseResponse;

    @BeforeEach
    void setUp() {
        course = new Course();
        course.setId(1L);
        course.setCourseCode("CS101");
        course.setCourseName("Intro to CS");
        course.setUnits(3);

        courseResponse = new CourseResponse();
        courseResponse.setCourseCode("CS101");
        courseResponse.setCourseName("Intro to CS");
        courseResponse.setUnits(3);

        SecurityContextHolder.clearContext();
    }

    private void setAuthority(String role) {
        var auth = new UsernamePasswordAuthenticationToken(
                "user-id", null,
                List.of(new SimpleGrantedAuthority("ROLE_" + role))
        );
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    // --- getAllCourses ---

    @Test
    void getAllCourses_returnsAllCourses() {
        when(courseRepository.findAll()).thenReturn(List.of(course));
        when(courseMapper.toResponse(course)).thenReturn(courseResponse);

        var result = (List<CourseResponse>) courseService.getAllCourses();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getCourseCode()).isEqualTo("CS101");
    }

    @Test
    void getAllCourses_returnsEmptyList_whenNoCourses() {
        when(courseRepository.findAll()).thenReturn(List.of());

        var result = (List<CourseResponse>) courseService.getAllCourses();

        assertThat(result).isEmpty();
    }

    // --- getCourseByCode ---

    @Test
    void getCourseByCode_asStudent_returnsResponseWithoutStudents() {
        setAuthority(Roles.STUDENT.name());
        when(courseRepository.findByCourseCode("CS101")).thenReturn(Optional.of(course));
        when(courseMapper.toResponse(course)).thenReturn(courseResponse);

        var result = courseService.getCourseByCode("CS101");

        assertThat(result.getStudents()).isNull();
        verify(enrollmentRepository, never()).findAllByCourseId(any());
    }

    @Test
    void getCourseByCode_asAdmin_returnsResponseWithStudents() {
        setAuthority(Roles.ADMIN.name());

        var student = new Student();
        student.setFirstName("Jane");
        student.setLastName("Doe");

        var enrollment = new Enrollment(student, course);
        var studentResponse = new StudentResponse();
        studentResponse.setName("Jane Doe");

        when(courseRepository.findByCourseCode("CS101")).thenReturn(Optional.of(course));
        when(courseMapper.toResponse(course)).thenReturn(courseResponse);
        when(enrollmentRepository.findAllByCourseId(1L)).thenReturn(List.of(enrollment));
        when(studentMapper.toStudentResponse(student)).thenReturn(studentResponse);

        var result = courseService.getCourseByCode("CS101");

        assertThat(result.getStudents()).hasSize(1);
        assertThat(result.getStudents().get(0).getName()).isEqualTo("Jane Doe");
    }

    @Test
    void getCourseByCode_asAdmin_returnsEmptyStudentList_whenNoneEnrolled() {
        setAuthority(Roles.ADMIN.name());
        when(courseRepository.findByCourseCode("CS101")).thenReturn(Optional.of(course));
        when(courseMapper.toResponse(course)).thenReturn(courseResponse);
        when(enrollmentRepository.findAllByCourseId(1L)).thenReturn(List.of());

        var result = courseService.getCourseByCode("CS101");

        assertThat(result.getStudents()).isEmpty();
    }

    @Test
    void getCourseByCode_throwsCourseNotFoundException_whenCourseDoesNotExist() {
        setAuthority(Roles.STUDENT.name());
        when(courseRepository.findByCourseCode("INVALID")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> courseService.getCourseByCode("INVALID"))
                .isInstanceOf(CourseNotFoundException.class);
    }

    // --- createCourse ---

    @Test
    void createCourse_success() {
        var request = new CreateCourseRequest();
        request.setCourseCode("CS101");
        request.setCourseName("Intro to CS");
        request.setUnits(3);

        when(courseRepository.existsByCourseCodeOrName("CS101", "Intro to CS")).thenReturn(false);
        when(courseMapper.toEntity(request)).thenReturn(course);
        when(courseMapper.toResponse(course)).thenReturn(courseResponse);

        var result = courseService.createCourse(request);

        assertThat(result.getCourseCode()).isEqualTo("CS101");
        verify(courseRepository).save(course);
    }

    @Test
    void createCourse_throwsDuplicateCourseException_whenCodeAlreadyExists() {
        var request = new CreateCourseRequest();
        request.setCourseCode("CS101");
        request.setCourseName("Intro to CS");

        when(courseRepository.existsByCourseCodeOrName("CS101", "Intro to CS")).thenReturn(true);

        assertThatThrownBy(() -> courseService.createCourse(request))
                .isInstanceOf(DuplicateCourseExceptionException.class);

        verify(courseRepository, never()).save(any());
    }

    // --- updateCourse ---

    @Test
    void updateCourse_success() {
        var request = new UpdateCourseRequest();
        request.setCourseCode("CS102");
        request.setCourseName("Advanced CS");

        when(courseRepository.findByCourseCode("CS101")).thenReturn(Optional.of(course));
        when(courseRepository.existsByCourseCodeOrName("CS102", "Advanced CS")).thenReturn(false);

        courseService.updateCourse("CS101", request);

        verify(courseMapper).update(request, course);
        verify(courseRepository).save(course);
    }

    @Test
    void updateCourse_throwsCourseNotFoundException_whenCourseDoesNotExist() {
        var request = new UpdateCourseRequest();
        when(courseRepository.findByCourseCode("INVALID")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> courseService.updateCourse("INVALID", request))
                .isInstanceOf(CourseNotFoundException.class);

        verify(courseRepository, never()).save(any());
    }

    @Test
    void updateCourse_throwsDuplicateCourseException_whenNewCodeOrNameAlreadyTaken() {
        var request = new UpdateCourseRequest();
        request.setCourseCode("CS999");
        request.setCourseName("Duplicate Course");

        when(courseRepository.findByCourseCode("CS101")).thenReturn(Optional.of(course));
        when(courseRepository.existsByCourseCodeOrName("CS999", "Duplicate Course")).thenReturn(true);

        assertThatThrownBy(() -> courseService.updateCourse("CS101", request))
                .isInstanceOf(DuplicateCourseExceptionException.class);

        verify(courseRepository, never()).save(any());
    }

    // --- deleteCourse ---

    @Test
    void deleteCourse_success() {
        when(courseRepository.findByCourseCode("CS101")).thenReturn(Optional.of(course));

        courseService.deleteCourse("CS101");

        verify(courseRepository).delete(course);
    }

    @Test
    void deleteCourse_throwsCourseNotFoundException_whenCourseDoesNotExist() {
        when(courseRepository.findByCourseCode("INVALID")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> courseService.deleteCourse("INVALID"))
                .isInstanceOf(CourseNotFoundException.class);

        verify(courseRepository, never()).delete(any());
    }
}
