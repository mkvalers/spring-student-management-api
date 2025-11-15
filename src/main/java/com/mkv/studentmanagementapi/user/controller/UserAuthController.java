package com.mkv.studentmanagementapi.user.controller;

import com.mkv.studentmanagementapi.user.dto.JwtResponse;
import com.mkv.studentmanagementapi.user.dto.LoginUserRequest;
import com.mkv.studentmanagementapi.user.dto.RegistrationRequest;
import com.mkv.studentmanagementapi.user.dto.RegistrationResponse;
import com.mkv.studentmanagementapi.user.service.UserAuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
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
    @Operation(summary = "Authenticates a user and returns JWT tokens upon successful login.")
    public JwtResponse login(
        @Valid @RequestBody LoginUserRequest request,
        HttpServletResponse response
    ) {
        return userAuthService.login(request, response);
    }

    @PostMapping("/logout")
    @Operation(summary = "Logs out the currently authenticated user by clearing the refresh token cookie.")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        userAuthService.logout(response);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refreshes the JWT tokens using the provided refresh token cookie.")
    public JwtResponse refresh(
        @CookieValue(value = "refreshToken") String refreshToken
    ) {
        return userAuthService.refresh(refreshToken);
    }

}
