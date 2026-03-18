package com.mkv.studentmanagementapi.enrollment.controller;

import com.mkv.studentmanagementapi.enrollment.dto.EnrollmentDto;
import com.mkv.studentmanagementapi.enrollment.dto.EnrollmentRequest;
import com.mkv.studentmanagementapi.enrollment.dto.EnrollmentResponse;
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
    public Iterable<EnrollmentResponse> getMyEnrollments() {
        return enrollmentService.getLoggedInStudentEnrollments();
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

}
