package com.mkv.studentmanagementapi.student.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class StudentDto {
    private Long id;

    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("year_level")
    private Integer yearLevel;
}
