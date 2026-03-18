package com.mkv.studentmanagementapi.student.mapper;

import com.mkv.studentmanagementapi.student.dto.StudentDto;
import com.mkv.studentmanagementapi.student.dto.StudentResponse;
import com.mkv.studentmanagementapi.user.dto.UpdateInfoRequest;
import com.mkv.studentmanagementapi.student.entity.Student;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface StudentMapper {

    @Mappings({
        @Mapping(target = "name", expression = "java(student.getFullName())"),
        @Mapping(target = "email", source = "user.email"),
        @Mapping(target = "createdAt", source = "user.createdAt")
    })
    StudentResponse toStudentResponse(Student student);

    @Mapping(target = "fullName", expression = "java(student.getFullName())")
    StudentDto toStudentDto(Student student);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "user.email", source = "email")
    void update(UpdateInfoRequest request, @MappingTarget Student student);

}
