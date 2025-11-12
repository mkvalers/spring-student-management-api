package com.mkv.studentmanagementapi.enrollment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EnrollmentRequest {
    @NotNull
    @JsonProperty("course_id")
    private Long courseId;
}
