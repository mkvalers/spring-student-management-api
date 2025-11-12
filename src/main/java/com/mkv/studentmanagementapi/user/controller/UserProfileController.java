package com.mkv.studentmanagementapi.user.controller;

import com.mkv.studentmanagementapi.user.dto.UpdateInfoRequest;
import com.mkv.studentmanagementapi.user.service.UserProfileService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/users")
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping("/me")
    public <T> T me() {
        return userProfileService.me();
    }

    @PutMapping("/me")
    public void updateStudent(@Valid @RequestBody UpdateInfoRequest request) {
        userProfileService.updateInfo(request);
    }

}
