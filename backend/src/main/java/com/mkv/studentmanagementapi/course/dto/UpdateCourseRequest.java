package com.mkv.studentmanagementapi.course.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UpdateCourseRequest {

    @NotBlank(message = "Course code must not be blank.")
    @Size(max = 20, message = "Course code must not exceed 20 characters.")
    @JsonProperty("course_code")
    private String courseCode;

    @NotBlank(message = "Course name must not be blank.")
    @Size(max = 100, message = "Course name must not exceed 100 characters.")
    @JsonProperty("course_name")
    private String courseName;

    @Positive(message = "Units must be a positive number.")
    @Max(value = 6, message = "Units must not exceed 6.")
    private Integer units;
}
