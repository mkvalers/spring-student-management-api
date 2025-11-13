package com.mkv.studentmanagementapi.course.controller;

import com.mkv.studentmanagementapi.course.dto.CourseResponse;
import com.mkv.studentmanagementapi.course.dto.CreateCourseRequest;
import com.mkv.studentmanagementapi.course.dto.UpdateCourseRequest;
import com.mkv.studentmanagementapi.course.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@AllArgsConstructor
@RestController
@RequestMapping("/courses")
@Tag(name = "3. Courses")
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    @Operation(summary = "Retrieve a list of all available courses. Both Student and Admin can access this." )
    public Iterable<CourseResponse> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{courseId}")
    @Operation(summary = "Retrieve detailed information about a specific course by its ID. Both Student and Admin can access this." )
    public CourseResponse getCourseById(@PathVariable Long courseId) {
        return courseService.getCourseById(courseId);
    }

    @PostMapping
    @Operation(summary = "Create a new course. Only Admin can access this." )
    public ResponseEntity<CourseResponse> createCourse(
        @Valid @RequestBody CreateCourseRequest request,
        UriComponentsBuilder builder
    ) {
        var course = courseService.createCourse(request);
        var uri = builder
                .path("/courses/{id}")
                .buildAndExpand(course.getId())
                .toUri();

        return ResponseEntity.created(uri).body(course);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing course by its ID. Only Admin can access this." )
    public ResponseEntity<Void> updateCourse(
        @PathVariable Long id,
        @Valid @RequestBody UpdateCourseRequest request
    ) {
        courseService.updateCourse(id, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a course by its ID. Only Admin can access this." )
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}
