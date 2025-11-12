package com.mkv.studentmanagementapi.enrollment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class EnrollmentDto {
    @JsonProperty("student_name")
    private String studentName;
    @JsonProperty("course_name")
    private String courseName;
}
