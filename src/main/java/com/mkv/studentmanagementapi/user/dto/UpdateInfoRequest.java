package com.mkv.studentmanagementapi.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateInfoRequest {
    @Email(message = "Invalid email format.")
    private String email;

    @Size(min = 8, max = 21, message = "Password must be between 8 - 21 characters.")
    private String password;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("year_level")
    @Min(1) @Max(6)
    private Integer yearLevel;
}
