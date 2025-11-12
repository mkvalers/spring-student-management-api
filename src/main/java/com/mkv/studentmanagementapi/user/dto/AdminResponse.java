package com.mkv.studentmanagementapi.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class AdminResponse {
    private UUID id;
    private String email;
    @JsonProperty("created_at")
    private LocalDateTime createdAt;

}
