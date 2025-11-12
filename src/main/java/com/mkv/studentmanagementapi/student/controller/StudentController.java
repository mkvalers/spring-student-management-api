package com.mkv.studentmanagementapi.student.controller;

import com.mkv.studentmanagementapi.student.service.StudentService;
import com.mkv.studentmanagementapi.student.dto.StudentDto;
import com.mkv.studentmanagementapi.student.dto.StudentResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/{id}")
    public StudentResponse getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @GetMapping
    public Iterable<StudentDto> getAllStudent(
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) Integer yearLevel,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return studentService.getAllStudents(firstName, lastName, yearLevel, page, size);
    }

}
