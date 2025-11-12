package com.mkv.studentmanagementapi.enrollment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class EnrollmentResponse {
    @JsonProperty("enrollment_id")
    private Long enrollmentId;

    @JsonProperty("course_id")
    private Long courseId;

    @JsonProperty("course_name")
    private String courseName;
}

