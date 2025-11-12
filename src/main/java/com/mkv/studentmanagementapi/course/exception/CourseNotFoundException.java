package com.mkv.studentmanagementapi.course.exception;

public class CourseNotFoundException extends RuntimeException {
    public CourseNotFoundException() {
        super("Course not found.");
    }
}
