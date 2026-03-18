package com.mkv.studentmanagementapi.enrollment.service;

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
import com.mkv.studentmanagementapi.student.exception.StudentNotFoundException;
import com.mkv.studentmanagementapi.student.repository.StudentRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@AllArgsConstructor
@Service
public class EnrollmentService {

    private static final Logger logger = LoggerFactory.getLogger(EnrollmentService.class);

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final EnrollmentMapper enrollmentMapper;

    @Transactional
    public EnrollmentDto enrollStudent(EnrollmentRequest request) {
        var userId = getLoggedInUserId();

        if (enrollmentRepository.existsByStudentUserIdAndCourseId(UUID.fromString(userId), request.getCourseId()))
            throw new StudentAlreadyEnrolledException();

        var student = studentRepository.findByUserId(UUID.fromString(userId)).orElseThrow();
        var course = courseRepository.findById(request.getCourseId()).orElseThrow(CourseNotFoundException::new);

        var enrollment = new Enrollment(student, course);
        enrollmentRepository.save(enrollment);

        logger.info("Student {} enrolled in course {}", userId, request.getCourseId());

        return enrollmentMapper.toDto(enrollment);
    }

    public Iterable<EnrollmentResponse> getLoggedInStudentEnrollments() {
        var userId = getLoggedInUserId();
        var student = studentRepository.findByUserId(UUID.fromString(userId)).orElseThrow(StudentNotFoundException::new);

        return enrollmentRepository.findAllByStudentId(student.getId()).stream()
                .map(enrollmentMapper::toResponse)
                .toList();
    }

    @Transactional
    public void dropCourse(Long enrollmentId) {
        var userId = getLoggedInUserId();
        var student = studentRepository.findByUserId(UUID.fromString(userId)).orElseThrow(StudentNotFoundException::new);
        var enrollment = enrollmentRepository.findByIdAndStudentId(enrollmentId, student.getId()).orElseThrow(EnrollmentNotFoundException::new);

        enrollmentRepository.delete(enrollment);

        logger.info("Student {} dropped enrollment {}", userId, enrollmentId);
    }

    private static String getLoggedInUserId() {
        return (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
