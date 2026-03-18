package com.mkv.studentmanagementapi.course.repository;

import com.mkv.studentmanagementapi.course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("select (count(c) > 0) from Course c where c.courseCode = :courseCode or c.courseName = :courseName")
    Boolean existsByCourseCodeOrName(@Param("courseCode") String courseCode, @Param("courseName") String courseName);

    Optional<Course> findByCourseCode(String courseCode);
}
