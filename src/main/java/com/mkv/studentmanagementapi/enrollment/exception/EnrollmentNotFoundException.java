package com.mkv.studentmanagementapi.enrollment.exception;

public class EnrollmentNotFoundException extends RuntimeException {
    public EnrollmentNotFoundException() {
        super("Enrollment not found.");
    }
}
