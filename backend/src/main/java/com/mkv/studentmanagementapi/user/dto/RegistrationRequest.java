package com.mkv.studentmanagementapi.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegistrationRequest {

    @Email(message = "Invalid email format.")
    @NotBlank(message = "Email is required.")
    private String email;

    @NotBlank(message = "Password is required.")
    @Size(min = 8, max = 21, message = "Password must be between 8 - 21 characters.")
    private String password;

    @JsonProperty("first_name")
    @NotBlank(message = "First name is required.")
    @Size(max = 50, message = "First name must not exceed 50 characters.")
    private String firstName;

    @JsonProperty("last_name")
    @NotBlank(message = "Last name is required.")
    @Size(max = 50, message = "Last name must not exceed 50 characters.")
    private String lastName;

    @NotNull(message = "Year level is required.")
    @JsonProperty("year_level")
    @Min(value = 1, message = "Year level must be at least 1.")
    @Max(value = 4, message = "Year level must be at most 4.")
    private Integer yearLevel;

}
