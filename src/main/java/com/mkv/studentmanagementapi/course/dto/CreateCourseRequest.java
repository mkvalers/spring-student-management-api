package com.mkv.studentmanagementapi.course.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CreateCourseRequest {
    @NotBlank
    @JsonProperty("course_code")
    private String courseCode;

    @NotBlank
    @JsonProperty("course_name")
    private String courseName;

    @NotNull
    @Positive
    private Integer units;
}
