package com.mkv.studentmanagementapi.admin;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@Tag(name = "6. Admin")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard/stats")
    @Operation(summary = "View Dashboard Statistics")
    public DashboardDto viewDashboardStats() {
        return adminService.getDashboardStats();
    }

}
