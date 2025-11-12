package com.mkv.studentmanagementapi.enrollment.exception;

public class StudentAlreadyEnrolledException extends RuntimeException {
    public StudentAlreadyEnrolledException() {
        super("Student already enrolled in this course.");
    }
}
