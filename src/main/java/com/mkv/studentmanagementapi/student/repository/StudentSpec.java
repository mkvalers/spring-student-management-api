package com.mkv.studentmanagementapi.student.repository;

import com.mkv.studentmanagementapi.student.entity.Student;
import org.springframework.data.jpa.domain.Specification;

public class StudentSpec {

    public static Specification<Student> hasFirstName(String firstName) {
        return (root, query, cb) ->
                firstName == null ? null : cb.like(cb.lower(root.get("firstName")), "%" + firstName.toLowerCase() + "%");
    }

    public static Specification<Student> hasLastName(String lastName) {
        return (root, query, cb) ->
                lastName == null ? null : cb.like(cb.lower(root.get("lastName")), "%" + lastName.toLowerCase() + "%");
    }

    public static Specification<Student> hasYearLevel(Integer yearLevel) {
        return (root, query, cb) ->
                yearLevel == null ? null : cb.equal(root.get("yearLevel"), yearLevel);
    }

    public static Specification<Student> combine(String firstName, String lastName, Integer yearLevel) {
        Specification<Student> spec = Specification.unrestricted();

        return spec.and(hasFirstName(firstName))
                .and(hasLastName(lastName))
                .and(hasYearLevel(yearLevel));
    }

}
