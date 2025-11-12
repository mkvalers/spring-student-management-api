package com.mkv.studentmanagementapi.student.service;

import com.mkv.studentmanagementapi.student.dto.StudentDto;
import com.mkv.studentmanagementapi.student.dto.StudentResponse;
import com.mkv.studentmanagementapi.student.exception.StudentNotFoundException;
import com.mkv.studentmanagementapi.student.mapper.StudentMapper;
import com.mkv.studentmanagementapi.student.repository.StudentRepository;
import com.mkv.studentmanagementapi.student.repository.StudentSpec;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;

    public StudentResponse getStudentById(Long id) {
        var student = studentRepository.findById(id).orElseThrow(StudentNotFoundException::new);
        return studentMapper.toStudentResponse(student);
    }

    public Iterable<StudentDto> getAllStudents(
            String firstName,
            String lastName,
            Integer yearLevel,
            int page,
            int size
    ) {
        var pageable = PageRequest.of(page, size);

        return studentRepository.findAll(
                    StudentSpec.combine(firstName, lastName, yearLevel),
                    pageable
                )
                .map(studentMapper::toStudentDto)
                .toList();
    }

}
