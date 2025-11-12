package com.mkv.studentmanagementapi.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegistrationRequest {

    @Email
    @NotBlank(message = "Email is required.")
    private String email;

    @NotBlank(message = "Password is required.")
    @Size(min = 8, max = 21, message = "Password must be between 8 - 21 characters.")
    private String password;

    @JsonProperty("first_name")
    @NotBlank(message = "First name is required.")
    private String firstName;

    @JsonProperty("last_name")
    @NotBlank(message = "Last name is required.")
    private String lastName;

    @NotNull(message = "Year level is required.")
    @JsonProperty("year_level")
    @Min(1) @Max(6)
    private Integer yearLevel;


}
