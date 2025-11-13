package com.mkv.studentmanagementapi.user.controller;

import com.mkv.studentmanagementapi.user.dto.UpdateInfoRequest;
import com.mkv.studentmanagementapi.user.service.UserProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/users")
@Tag(name = "2. Users")
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping("/me")
    @Operation(summary = "Retrieve the profile information of the currently logged-in user.")
    public <T> T me() {
        return userProfileService.me();
    }

    @PutMapping("/me")
    @Operation(summary = "Update the profile information of the currently logged-in user.")
    public void updateStudent(@Valid @RequestBody UpdateInfoRequest request) {
        userProfileService.updateInfo(request);
    }

}
