package com.mkv.studentmanagementapi.student.controller;

import com.mkv.studentmanagementapi.student.service.StudentService;
import com.mkv.studentmanagementapi.student.dto.StudentDto;
import com.mkv.studentmanagementapi.student.dto.StudentResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/students")
@Tag(name = "5. Students", description = "Only Admins can access the student endpoints")
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/{id}")
    @Operation(summary = "Get Student by ID")
    public StudentResponse getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @GetMapping
    @Operation(summary = "Get All Students with Optional Filters and Pagination")
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
