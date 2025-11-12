package com.mkv.studentmanagementapi.common.exception;

import com.mkv.studentmanagementapi.user.exception.AccessTokenNotValidException;
import com.mkv.studentmanagementapi.user.exception.DuplicateEmailException;
import com.mkv.studentmanagementapi.user.exception.RoleNotFoundException;
import com.mkv.studentmanagementapi.course.exception.DuplicateCourseExceptionException;
import com.mkv.studentmanagementapi.course.exception.CourseNotFoundException;
import com.mkv.studentmanagementapi.enrollment.exception.EnrollmentNotFoundException;
import com.mkv.studentmanagementapi.enrollment.exception.StudentAlreadyEnrolledException;
import com.mkv.studentmanagementapi.student.exception.StudentNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorDto> handleUnreadableMessage() {
        return ResponseEntity.badRequest().body(
                new ErrorDto("Invalid request body.")
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<HashMap<String, String>> handleValidationErrors(
            MethodArgumentNotValidException exception
    ){
        var errors = new HashMap<String, String>();

        exception.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
        );

        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler({DuplicateEmailException.class, DuplicateCourseExceptionException.class, StudentAlreadyEnrolledException.class})
    public ResponseEntity<ErrorDto> handleExistingDataException(Exception ex) {
        return ResponseEntity.badRequest().body(new ErrorDto(ex.getMessage()));
    }

    @ExceptionHandler({RoleNotFoundException.class, StudentNotFoundException.class, CourseNotFoundException.class, EnrollmentNotFoundException.class})
    public ResponseEntity<ErrorDto> handleNotFoundException(Exception ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorDto(ex.getMessage()));
    }

    @ExceptionHandler(AccessTokenNotValidException.class)
    public ResponseEntity<ErrorDto> handleAccessTokenExpiredException(Exception ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorDto(ex.getMessage()));
    }

}
