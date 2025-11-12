package com.mkv.studentmanagementapi.admin;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class DashboardDto {
    public DashboardDto(long totalCourses, long totalEnrollments, long totalStudents) {
        this.totalCourses = totalCourses;
        this.totalEnrollments = totalEnrollments;
        this.totalStudents = totalStudents;
    }

    @JsonProperty("total_students")
    private long totalStudents;

    @JsonProperty("total_courses")
    private long totalCourses;

    @JsonProperty("total_enrollments")
    private long totalEnrollments;
}
