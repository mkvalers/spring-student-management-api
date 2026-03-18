package com.mkv.studentmanagementapi.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateInfoRequest {

    @Email(message = "Invalid email format.")
    @NotBlank(message = "Email must not be blank.")
    private String email;

    @NotBlank(message = "Password must not be blank.")
    @Size(min = 8, max = 21, message = "Password must be between 8 - 21 characters.")
    private String password;

}
