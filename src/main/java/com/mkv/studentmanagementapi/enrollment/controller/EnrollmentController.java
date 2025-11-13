package com.mkv.studentmanagementapi.enrollment.controller;

import com.mkv.studentmanagementapi.enrollment.dto.*;
import com.mkv.studentmanagementapi.enrollment.service.EnrollmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/enrollments")
@Tag(name = "4. Enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @GetMapping("/me")
    @Operation(summary = "Get enrollments for the logged-in student.")
    public Iterable<EnrollmentResponse> getLoggedInStudentEnrollments() {
        return enrollmentService.getLoggedInStudentEnrollments();
    }

    @GetMapping("/students/{studentId}")
    @Operation(summary = "Get enrollments for a specific student by ID. Only Admin can access this.")
    public StudentEnrollmentDto getStudentEnrollments(@PathVariable Long studentId) {
        return enrollmentService.getStudentEnrollments(studentId);
    }

    @PostMapping
    @Operation(summary = "Enroll the logged-in student to a course.")
    public EnrollmentDto enrollStudent(@Valid @RequestBody EnrollmentRequest request) {
        return enrollmentService.enrollStudent(request);
    }

    @DeleteMapping("/{enrollmentId}")
    @Operation(summary = "Drop a course for the logged-in student.")
    public ResponseEntity<Void> dropCourse(@PathVariable Long enrollmentId) {
        enrollmentService.dropCourse(enrollmentId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/courses/{courseId}")
    @Operation(summary = "Get students enrolled in a specific course by ID. Only Admin can access this.")
    public StudentsInCourseResponse getStudentsEnrolledInCourse(@PathVariable Long courseId) {
        return enrollmentService.getStudentsInCourse(courseId);
    }

}
