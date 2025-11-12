package com.mkv.studentmanagementapi.enrollment.repository;

import com.mkv.studentmanagementapi.enrollment.entity.Enrollment;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    boolean existsByStudentUserIdAndCourseId(UUID studentUserId, Long courseId);

    @EntityGraph(attributePaths = {"course"})
    List<Enrollment> findAllByStudentId(Long studentId);

    Optional<Enrollment> findByIdAndStudentId(Long id, Long id1);

    @Query("SELECT e FROM Enrollment e JOIN FETCH e.student s JOIN FETCH s.user u WHERE e.course.id = :courseId")
    List<Enrollment> findAllByCourseId(@Param("courseId") Long courseId);

}