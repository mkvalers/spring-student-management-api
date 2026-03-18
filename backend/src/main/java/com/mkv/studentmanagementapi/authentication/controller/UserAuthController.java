package com.mkv.studentmanagementapi.authentication.controller;

import com.mkv.studentmanagementapi.authentication.dto.JwtResponse;
import com.mkv.studentmanagementapi.authentication.service.user.UserAuthService;
import com.mkv.studentmanagementapi.user.dto.LoginUserRequest;
import com.mkv.studentmanagementapi.user.dto.RegistrationRequest;
import com.mkv.studentmanagementapi.user.dto.RegistrationResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@AllArgsConstructor
@RestController
@RequestMapping("/auth")
@Tag(name = "1. Authentication")
public class UserAuthController {

    private final UserAuthService userAuthService;

    @PostMapping("/register")
    @Operation(summary = "Registers a new user and returns the user's details.")
    public ResponseEntity<RegistrationResponse> register(@Valid @RequestBody RegistrationRequest request, UriComponentsBuilder builder) {
        var response = userAuthService.register(request);

        var uri = builder
                .path("/users/{id}")
                .buildAndExpand(response.getId())
                .toUri();

        return ResponseEntity.created(uri).body(response);
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticates a user and returns a JWT token upon successful login.")
    public JwtResponse login(@Valid @RequestBody LoginUserRequest request) {
        return userAuthService.login(request);
    }

}
