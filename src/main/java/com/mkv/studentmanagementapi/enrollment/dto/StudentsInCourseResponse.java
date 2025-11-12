package com.mkv.studentmanagementapi.enrollment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mkv.studentmanagementapi.student.dto.StudentResponse;
import lombok.Data;

import java.util.List;

@Data
public class StudentsInCourseResponse {
    @JsonProperty("course_name")
    private String courseName;

    private List<StudentResponse> students;
}
