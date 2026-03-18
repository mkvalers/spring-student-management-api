package com.mkv.studentmanagementapi.user.controller;

import com.mkv.studentmanagementapi.student.dto.StudentResponse;
import com.mkv.studentmanagementapi.user.dto.AdminResponse;
import com.mkv.studentmanagementapi.user.dto.AdminUpdateRequest;
import com.mkv.studentmanagementapi.user.dto.UpdateInfoRequest;
import com.mkv.studentmanagementapi.user.service.UserProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/users")
@Tag(name = "2. Users")
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping("/me")
    @Operation(summary = "Retrieve the profile of the logged-in student.")
    public StudentResponse me() {
        return userProfileService.getStudentProfile();
    }

    @PutMapping("/me")
    @Operation(summary = "Update email or password of the logged-in student.")
    public ResponseEntity<Void> updateStudentInfo(@Valid @RequestBody UpdateInfoRequest request) {
        userProfileService.updateStudentInfo(request);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/me")
    @Operation(summary = "Retrieve the profile of the logged-in admin.")
    public AdminResponse adminMe() {
        return userProfileService.getAdminProfile();
    }

    @PutMapping("/admin/me")
    @Operation(summary = "Update the admin password.")
    public ResponseEntity<Void> updateAdminPassword(@Valid @RequestBody AdminUpdateRequest request) {
        userProfileService.updateAdminPassword(request);
        return ResponseEntity.noContent().build();
    }

}
