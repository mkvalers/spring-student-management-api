package com.mkv.studentmanagementapi.enrollment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class StudentEnrollmentDto {
    @JsonProperty("student_name")
    private String studentName;

    private List<EnrollmentResponse> enrollments;
}
