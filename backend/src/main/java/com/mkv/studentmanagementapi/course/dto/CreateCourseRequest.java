package com.mkv.studentmanagementapi.course.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CreateCourseRequest {

    @NotBlank(message = "Course code is required.")
    @Size(max = 20, message = "Course code must not exceed 20 characters.")
    @JsonProperty("course_code")
    private String courseCode;

    @NotBlank(message = "Course name is required.")
    @Size(max = 100, message = "Course name must not exceed 100 characters.")
    @JsonProperty("course_name")
    private String courseName;

    @NotNull(message = "Units is required.")
    @Positive(message = "Units must be a positive number.")
    @Max(value = 6, message = "Units must not exceed 6.")
    private Integer units;
}
