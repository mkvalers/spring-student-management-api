package com.mkv.studentmanagementapi.enrollment.controller;

import com.mkv.studentmanagementapi.enrollment.dto.*;
import com.mkv.studentmanagementapi.enrollment.service.EnrollmentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @GetMapping("/me")
    public Iterable<EnrollmentResponse> getLoggedInStudentEnrollments() {
        return enrollmentService.getLoggedInStudentEnrollments();
    }

    @GetMapping("/students/{studentId}")
    public StudentEnrollmentDto getStudentEnrollments(@PathVariable Long studentId) {
        return enrollmentService.getStudentEnrollments(studentId);
    }

    @PostMapping
    public EnrollmentDto enrollStudent(@Valid @RequestBody EnrollmentRequest request) {
        return enrollmentService.enrollStudent(request);
    }

    @DeleteMapping("/{enrollmentId}")
    public ResponseEntity<Void> dropCourse(@PathVariable Long enrollmentId) {
        enrollmentService.dropCourse(enrollmentId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/courses/{courseId}")
    public StudentsInCourseResponse getStudentsEnrolledInCourse(@PathVariable Long courseId) {
        return enrollmentService.getStudentsInCourse(courseId);
    }

}
