package com.mkv.studentmanagementapi.course.service;

import com.mkv.studentmanagementapi.course.dto.CourseResponse;
import com.mkv.studentmanagementapi.course.dto.CreateCourseRequest;
import com.mkv.studentmanagementapi.course.dto.UpdateCourseRequest;
import com.mkv.studentmanagementapi.course.exception.CourseNotFoundException;
import com.mkv.studentmanagementapi.course.exception.DuplicateCourseExceptionException;
import com.mkv.studentmanagementapi.course.mapper.CourseMapper;
import com.mkv.studentmanagementapi.course.repository.CourseRepository;
import com.mkv.studentmanagementapi.enrollment.entity.Enrollment;
import com.mkv.studentmanagementapi.enrollment.repository.EnrollmentRepository;
import com.mkv.studentmanagementapi.student.mapper.StudentMapper;
import com.mkv.studentmanagementapi.user.entity.Roles;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class CourseService {

    private static final Logger logger = LoggerFactory.getLogger(CourseService.class);

    private final CourseMapper courseMapper;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final StudentMapper studentMapper;

    public Iterable<CourseResponse> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(courseMapper::toResponse)
                .toList();
    }

    public CourseResponse getCourseByCode(String courseCode) {
        var course = courseRepository.findByCourseCode(courseCode).orElseThrow(CourseNotFoundException::new);
        var response = courseMapper.toResponse(course);

        if (isAdmin()) {
            var students = enrollmentRepository.findAllByCourseId(course.getId()).stream()
                    .map(Enrollment::getStudent)
                    .map(studentMapper::toStudentResponse)
                    .toList();
            response.setStudents(students);
        }

        return response;
    }

    @Transactional
    public CourseResponse createCourse(CreateCourseRequest request) {
        if (courseRepository.existsByCourseCodeOrName(request.getCourseCode(), request.getCourseName()))
            throw new DuplicateCourseExceptionException();

        var course = courseMapper.toEntity(request);
        courseRepository.save(course);

        logger.info("Created course with code {}", request.getCourseCode());

        return courseMapper.toResponse(course);
    }

    @Transactional
    public void updateCourse(String courseCode, UpdateCourseRequest request) {
        var course = courseRepository.findByCourseCode(courseCode).orElseThrow(CourseNotFoundException::new);

        if (courseRepository.existsByCourseCodeOrName(request.getCourseCode(), request.getCourseName()))
            throw new DuplicateCourseExceptionException();

        courseMapper.update(request, course);
        courseRepository.save(course);

        logger.info("Updated course with code {}", courseCode);
    }

    @Transactional
    public void deleteCourse(String courseCode) {
        var course = courseRepository.findByCourseCode(courseCode).orElseThrow(CourseNotFoundException::new);
        courseRepository.delete(course);

        logger.info("Deleted course with code {}", courseCode);
    }

    private boolean isAdmin() {
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_" + Roles.ADMIN.name()));
    }

}
