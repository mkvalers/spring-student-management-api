package com.mkv.studentmanagementapi.student.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StudentResponse {
    private Long id;
    private String email;
    private String name;
    @JsonProperty("year_level")
    private int yearLevel;
    @JsonProperty("created_at")
    private LocalDateTime createdAt;

}
