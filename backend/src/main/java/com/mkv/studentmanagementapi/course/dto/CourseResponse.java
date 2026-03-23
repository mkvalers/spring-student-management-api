package com.mkv.studentmanagementapi.course.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mkv.studentmanagementapi.student.dto.StudentResponse;
import lombok.Data;

import java.util.List;

@Data
public class CourseResponse {

    private Long id;

    @JsonProperty("course_code")
    private String courseCode;

    @JsonProperty("course_name")
    private String courseName;

    private Integer units;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<StudentResponse> students;
}
