package com.mkv.studentmanagementapi.student;

import com.mkv.studentmanagementapi.student.dto.StudentDto;
import com.mkv.studentmanagementapi.student.dto.StudentResponse;
import com.mkv.studentmanagementapi.student.entity.Student;
import com.mkv.studentmanagementapi.student.exception.StudentNotFoundException;
import com.mkv.studentmanagementapi.student.mapper.StudentMapper;
import com.mkv.studentmanagementapi.student.repository.StudentRepository;
import com.mkv.studentmanagementapi.student.service.StudentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock StudentRepository studentRepository;
    @Mock StudentMapper studentMapper;

    @InjectMocks StudentService studentService;

    private Student student;

    @BeforeEach
    void setUp() {
        student = new Student();
        student.setId(1L);
        student.setFirstName("John");
        student.setLastName("Doe");
        student.setYearLevel(2);
    }

    // --- getStudentById ---

    @Test
    void getStudentById_success() {
        var response = new StudentResponse();
        response.setName("John Doe");

        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));
        when(studentMapper.toStudentResponse(student)).thenReturn(response);

        var result = studentService.getStudentById(1L);

        assertThat(result.getName()).isEqualTo("John Doe");
    }

    @Test
    void getStudentById_throwsStudentNotFoundException_whenStudentDoesNotExist() {
        when(studentRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> studentService.getStudentById(99L))
                .isInstanceOf(StudentNotFoundException.class);
    }

    // --- getAllStudents ---

    @Test
    void getAllStudents_returnsPagedResults() {
        var dto = new StudentDto();
        dto.setFullName("John Doe");

        var page = new PageImpl<>(List.of(student), PageRequest.of(0, 10), 1);

        when(studentRepository.findAll(any(Specification.class), eq(PageRequest.of(0, 10)))).thenReturn(page);
        when(studentMapper.toStudentDto(student)).thenReturn(dto);

        var result = (List<StudentDto>) studentService.getAllStudents(null, null, null, 0, 10);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getFullName()).isEqualTo("John Doe");
    }

    @Test
    void getAllStudents_returnsEmptyList_whenNoStudentsMatch() {
        var emptyPage = new PageImpl<Student>(List.of(), PageRequest.of(0, 10), 0);

        when(studentRepository.findAll(any(Specification.class), eq(PageRequest.of(0, 10)))).thenReturn(emptyPage);

        var result = (List<StudentDto>) studentService.getAllStudents("NonExistent", null, null, 0, 10);

        assertThat(result).isEmpty();
    }

    @Test
    void getAllStudents_withAllFilters_passesCorrectPageable() {
        var dto = new StudentDto();
        dto.setFullName("John Doe");
        dto.setYearLevel(2);

        var page = new PageImpl<>(List.of(student), PageRequest.of(1, 5), 1);

        when(studentRepository.findAll(any(Specification.class), eq(PageRequest.of(1, 5)))).thenReturn(page);
        when(studentMapper.toStudentDto(student)).thenReturn(dto);

        var result = (List<StudentDto>) studentService.getAllStudents("John", "Doe", 2, 1, 5);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getYearLevel()).isEqualTo(2);
    }

    @Test
    void getAllStudents_returnsMultipleStudents() {
        var student2 = new Student();
        student2.setId(2L);
        student2.setFirstName("Jane");
        student2.setLastName("Smith");

        var dto1 = new StudentDto();
        dto1.setFullName("John Doe");
        var dto2 = new StudentDto();
        dto2.setFullName("Jane Smith");

        var page = new PageImpl<>(List.of(student, student2), PageRequest.of(0, 10), 2);

        when(studentRepository.findAll(any(Specification.class), eq(PageRequest.of(0, 10)))).thenReturn(page);
        when(studentMapper.toStudentDto(student)).thenReturn(dto1);
        when(studentMapper.toStudentDto(student2)).thenReturn(dto2);

        var result = (List<StudentDto>) studentService.getAllStudents(null, null, null, 0, 10);

        assertThat(result).hasSize(2);
    }
}
