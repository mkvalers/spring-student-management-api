package com.mkv.studentmanagementapi.enrollment.mapper;

import com.mkv.studentmanagementapi.course.entity.Course;
import com.mkv.studentmanagementapi.enrollment.dto.EnrollmentDto;
import com.mkv.studentmanagementapi.enrollment.dto.EnrollmentResponse;
import com.mkv.studentmanagementapi.enrollment.dto.StudentEnrollmentDto;
import com.mkv.studentmanagementapi.enrollment.dto.StudentsInCourseResponse;
import com.mkv.studentmanagementapi.enrollment.entity.Enrollment;
import com.mkv.studentmanagementapi.student.entity.Student;
import com.mkv.studentmanagementapi.student.dto.StudentResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EnrollmentMapper {
    @Mapping(target = "studentName", expression = "java(enrollment.getStudentName())")
    @Mapping(target = "courseName", source = "course.courseName")
    EnrollmentDto toDto(Enrollment enrollment);

    @Mapping(target = "enrollmentId", source = "id")
    @Mapping(target = "courseId", source = "course.id")
    @Mapping(target = "courseName", source = "course.courseName")
    EnrollmentResponse toResponse(Enrollment enrollment);

    @Mapping(target = "studentName", expression = "java(student.getFullName())")
    StudentEnrollmentDto toStudentEnrollmentDto(Student student, List<EnrollmentResponse> enrollments);

    StudentsInCourseResponse toStudentsInCourseResponse(Course course, List<StudentResponse> students);
}
