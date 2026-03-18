package com.mkv.studentmanagementapi.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AdminUpdateRequest {

    @NotBlank(message = "Password is required.")
    @Size(min = 8, max = 21, message = "Password must be between 8 - 21 characters.")
    private String password;

}
