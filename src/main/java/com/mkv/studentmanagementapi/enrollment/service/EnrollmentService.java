package com.mkv.studentmanagementapi.enrollment.service;

import com.mkv.studentmanagementapi.enrollment.dto.*;
import com.mkv.studentmanagementapi.enrollment.entity.Enrollment;
import com.mkv.studentmanagementapi.course.exception.CourseNotFoundException;
import com.mkv.studentmanagementapi.enrollment.exception.EnrollmentNotFoundException;
import com.mkv.studentmanagementapi.enrollment.exception.StudentAlreadyEnrolledException;
import com.mkv.studentmanagementapi.student.exception.StudentNotFoundException;
import com.mkv.studentmanagementapi.enrollment.mapper.EnrollmentMapper;
import com.mkv.studentmanagementapi.student.mapper.StudentMapper;
import com.mkv.studentmanagementapi.course.repository.CourseRepository;
import com.mkv.studentmanagementapi.enrollment.repository.EnrollmentRepository;
import com.mkv.studentmanagementapi.student.repository.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@AllArgsConstructor
@Service
public class EnrollmentService {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final EnrollmentMapper enrollmentMapper;
    private final StudentMapper studentMapper;

    public EnrollmentDto enrollStudent(EnrollmentRequest request) {
        var userId = getLoggedInUserId();

        if(enrollmentRepository.existsByStudentUserIdAndCourseId((UUID.fromString(userId)), request.getCourseId())) {
            throw new StudentAlreadyEnrolledException();
        }

        var student = studentRepository.findByUserId(UUID.fromString(userId)).orElseThrow();
        var course = courseRepository.findById(request.getCourseId()).orElseThrow(CourseNotFoundException::new);

        var enrollment = new Enrollment(student, course);

        enrollmentRepository.save(enrollment);

        return enrollmentMapper.toDto(enrollment);
    }

    public Iterable<EnrollmentResponse> getLoggedInStudentEnrollments() {
        var userId = getLoggedInUserId();

        var student = studentRepository.findByUserId(UUID.fromString(userId)).orElseThrow(StudentNotFoundException::new);

        var enrollments = enrollmentRepository.findAllByStudentId(student.getId());

        return enrollments.stream()
                .map(enrollmentMapper::toResponse)
                .toList();
    }

    public void dropCourse(Long enrollmentId) {
        var userId = getLoggedInUserId();
        var student = studentRepository.findByUserId(UUID.fromString(userId)).orElseThrow(StudentNotFoundException::new);
        var enrollment = enrollmentRepository.findByIdAndStudentId(enrollmentId, student.getId()).orElseThrow(EnrollmentNotFoundException::new);

        enrollmentRepository.delete(enrollment);
    }

    public StudentEnrollmentDto getStudentEnrollments(Long studentId) {
        var student = studentRepository.findById(studentId).orElseThrow(StudentNotFoundException::new);
        var enrollments = enrollmentRepository.findAllByStudentId(studentId);

        var mappedEnrollments =  enrollments.stream()
                .map(enrollmentMapper::toResponse)
                .toList();

        return enrollmentMapper.toStudentEnrollmentDto(student, mappedEnrollments);

    }

    public StudentsInCourseResponse getStudentsInCourse(Long courseId) {
        var course = courseRepository.findById(courseId).orElseThrow(CourseNotFoundException::new);
        var enrollments = enrollmentRepository.findAllByCourseId(courseId);

        var mappedStudents = enrollments.stream()
                .map(Enrollment::getStudent)
                .map(studentMapper::toStudentResponse)
                .toList();

        return enrollmentMapper.toStudentsInCourseResponse(course, mappedStudents);
    }

    private static String getLoggedInUserId() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        return (String) authentication.getPrincipal();
    }


}
