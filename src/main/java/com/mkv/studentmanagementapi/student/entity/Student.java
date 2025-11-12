package com.mkv.studentmanagementapi.student.entity;

import com.mkv.studentmanagementapi.user.entity.User;
import com.mkv.studentmanagementapi.enrollment.entity.Enrollment;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "year_level")
    private Integer yearLevel;

    @OneToMany(mappedBy = "student")
    private Set<Enrollment> enrollments = new LinkedHashSet<>();

    public String getFullName() {
        return String.format("%s %s", firstName, lastName);
    }

    public void setUserPassword(String password) {
        getUser().setPassword(password);
    }
}