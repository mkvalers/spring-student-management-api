package com.mkv.studentmanagementapi.user.exception;

public class AccessTokenNotValidException extends RuntimeException {
    public AccessTokenNotValidException() {
        super("Access token is null or not valid anymore.");
    }
}
