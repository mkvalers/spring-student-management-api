package com.mkv.studentmanagementapi.course.repository;

import com.mkv.studentmanagementapi.course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
    Boolean existsByCourseCodeOrCourseName(String courseCode, String courseName);
    }