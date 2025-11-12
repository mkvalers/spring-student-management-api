package com.mkv.studentmanagementapi.course.controller;

import com.mkv.studentmanagementapi.course.dto.CourseResponse;
import com.mkv.studentmanagementapi.course.dto.CreateCourseRequest;
import com.mkv.studentmanagementapi.course.dto.UpdateCourseRequest;
import com.mkv.studentmanagementapi.course.service.CourseService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@AllArgsConstructor
@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public Iterable<CourseResponse> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{courseId}")
    public CourseResponse getCourseById(@PathVariable Long courseId) {
        return courseService.getCourseById(courseId);
    }

    @PostMapping
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
    public ResponseEntity<Void> updateCourse(
        @PathVariable Long id,
        @Valid @RequestBody UpdateCourseRequest request
    ) {
        courseService.updateCourse(id, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}
