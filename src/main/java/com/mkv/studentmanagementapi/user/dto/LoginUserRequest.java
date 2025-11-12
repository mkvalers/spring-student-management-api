package com.mkv.studentmanagementapi.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginUserRequest {

    @NotBlank(message = "Name shouldn't be blank.")
    @Email
    private String email;

    @NotBlank(message = "Name shouldn't be blank.")
    private String password;

}
