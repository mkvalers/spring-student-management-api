package com.mkv.studentmanagementapi.admin;

import com.mkv.studentmanagementapi.course.repository.CourseRepository;
import com.mkv.studentmanagementapi.enrollment.repository.EnrollmentRepository;
import com.mkv.studentmanagementapi.student.repository.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class AdminService {

    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    public DashboardDto getDashboardStats() {

        var totalEnrollments = enrollmentRepository.count();
        var totalStudents = studentRepository.count();
        var totalCourses = courseRepository.count();

        return new DashboardDto(totalCourses, totalEnrollments, totalStudents);
    }

}
