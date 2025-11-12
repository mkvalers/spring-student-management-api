package com.mkv.studentmanagementapi.user.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class RegistrationResponse {

    private UUID id;
    private String email;
    private String firstName;
    private String lastName;
}
