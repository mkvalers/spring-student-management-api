package com.mkv.studentmanagementapi.course.service;

import com.mkv.studentmanagementapi.course.dto.CreateCourseRequest;
import com.mkv.studentmanagementapi.course.dto.CourseResponse;
import com.mkv.studentmanagementapi.course.dto.UpdateCourseRequest;
import com.mkv.studentmanagementapi.course.exception.DuplicateCourseExceptionException;
import com.mkv.studentmanagementapi.course.exception.CourseNotFoundException;
import com.mkv.studentmanagementapi.course.mapper.CourseMapper;
import com.mkv.studentmanagementapi.course.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CourseService {

    private final CourseMapper courseMapper;
    private final CourseRepository courseRepository;

    public Iterable<CourseResponse> getAllCourses() {
        var courses = courseRepository.findAll();
        return courses.stream()
                .map(courseMapper::toResponse)
                .toList();
    }

    public CourseResponse getCourseById(Long courseId) {
        var course = courseRepository.findById(courseId).orElseThrow(CourseNotFoundException::new);
        return courseMapper.toResponse(course);
    }

    public CourseResponse createCourse(CreateCourseRequest request) {
        var exists = courseRepository.existsByCourseCodeOrCourseName(request.getCourseCode(), request.getCourseName());

        if (exists) throw new DuplicateCourseExceptionException();

        var course = courseMapper.toEntity(request);
        courseRepository.save(course);

        return courseMapper.toResponse(course);
    }

    public void updateCourse(Long courseId, UpdateCourseRequest request) {
        var course = courseRepository.findById(courseId).orElseThrow(CourseNotFoundException::new);

        var exists = courseRepository.existsByCourseCodeOrCourseName(request.getCourseCode(), request.getCourseName());
        if (exists) throw new DuplicateCourseExceptionException();

        courseMapper.update(request, course);
        courseRepository.save(course);
    }

    public void deleteCourse(Long courseId) {
        var course = courseRepository.findById(courseId).orElseThrow(CourseNotFoundException::new);
        courseRepository.delete(course);
    }
}
