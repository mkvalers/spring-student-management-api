package com.mkv.studentmanagementapi.user.controller;

import com.mkv.studentmanagementapi.user.dto.JwtResponse;
import com.mkv.studentmanagementapi.user.dto.LoginUserRequest;
import com.mkv.studentmanagementapi.user.dto.RegistrationRequest;
import com.mkv.studentmanagementapi.user.dto.RegistrationResponse;
import com.mkv.studentmanagementapi.user.service.UserAuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@AllArgsConstructor
@RestController
@RequestMapping("/auth")
public class UserAuthController {

    private final UserAuthService userAuthService;

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@Valid @RequestBody RegistrationRequest request, UriComponentsBuilder builder) {
        var response = userAuthService.register(request);

        var uri = builder
                .path("/users/{id}")
                .buildAndExpand(response.getId())
                .toUri();

        return ResponseEntity.created(uri).body(response);
    }

    @PostMapping("/login")
    public JwtResponse login(
        @Valid @RequestBody LoginUserRequest request,
        HttpServletResponse response
    ) {
        return userAuthService.login(request, response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        userAuthService.logout(response);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/refresh")
    public JwtResponse refresh(
        @CookieValue(value = "refreshToken") String refreshToken
    ) {
        return userAuthService.refresh(refreshToken);
    }

}
