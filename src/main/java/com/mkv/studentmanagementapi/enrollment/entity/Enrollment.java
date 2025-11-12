package com.mkv.studentmanagementapi.enrollment.entity;

import com.mkv.studentmanagementapi.course.entity.Course;
import com.mkv.studentmanagementapi.student.entity.Student;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "enrollments")
@RequiredArgsConstructor
public class Enrollment {

    public Enrollment(Student student, Course course) {
        this.student = student;
        this.course = course;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    public String getStudentName() {
        return student.getFullName();
    }
}