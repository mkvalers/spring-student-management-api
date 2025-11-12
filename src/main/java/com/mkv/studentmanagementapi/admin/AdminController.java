package com.mkv.studentmanagementapi.admin;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard/stats")
    public DashboardDto viewDashboardStats() {
        return adminService.getDashboardStats();
    }



}
