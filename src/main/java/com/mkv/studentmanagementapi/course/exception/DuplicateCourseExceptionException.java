package com.mkv.studentmanagementapi.course.exception;

public class DuplicateCourseExceptionException extends RuntimeException {
    public DuplicateCourseExceptionException() {
        super("Course code or name already exist.");
    }
}
