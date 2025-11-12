package com.mkv.studentmanagementapi.user.exception;

public class DuplicateEmailException extends RuntimeException {
    public DuplicateEmailException() {
        super("Email already exists");
}
}
