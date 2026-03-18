package com.mkv.studentmanagementapi.enrollment.mapper;

import com.mkv.studentmanagementapi.enrollment.dto.EnrollmentDto;
import com.mkv.studentmanagementapi.enrollment.dto.EnrollmentResponse;
import com.mkv.studentmanagementapi.enrollment.entity.Enrollment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface EnrollmentMapper {

    @Mappings({
        @Mapping(target = "studentName", expression = "java(enrollment.getStudentName())"),
        @Mapping(target = "courseName", source = "course.courseName")
    })
    EnrollmentDto toDto(Enrollment enrollment);

    @Mappings({
        @Mapping(target = "enrollmentId", source = "id"),
        @Mapping(target = "courseId", source = "course.id"),
        @Mapping(target = "courseName", source = "course.courseName")
    })
    EnrollmentResponse toResponse(Enrollment enrollment);

}
