package com.mkv.studentmanagementapi.user.service;

import com.mkv.studentmanagementapi.student.dto.StudentResponse;
import com.mkv.studentmanagementapi.student.mapper.StudentMapper;
import com.mkv.studentmanagementapi.student.repository.StudentRepository;
import com.mkv.studentmanagementapi.user.dto.AdminResponse;
import com.mkv.studentmanagementapi.user.dto.AdminUpdateRequest;
import com.mkv.studentmanagementapi.user.dto.UpdateInfoRequest;
import com.mkv.studentmanagementapi.user.mapper.UserMapper;
import com.mkv.studentmanagementapi.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@AllArgsConstructor
@Service
public class UserProfileService {

    private static final Logger logger = LoggerFactory.getLogger(UserProfileService.class);

    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final StudentMapper studentMapper;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;

    public StudentResponse getStudentProfile() {
        var userId = getLoggedInUserId();
        var student = studentRepository.findByUserId(UUID.fromString(userId)).orElseThrow();
        return studentMapper.toStudentResponse(student);
    }

    public AdminResponse getAdminProfile() {
        var userId = getLoggedInUserId();
        var user = userRepository.findById(UUID.fromString(userId)).orElseThrow();
        return userMapper.toAdminDto(user);
    }

    @Transactional
    public void updateStudentInfo(UpdateInfoRequest request) {
        var userId = getLoggedInUserId();
        var student = studentRepository.findByUserId(UUID.fromString(userId)).orElseThrow();

        if (request.getPassword() != null)
            student.setUserPassword(passwordEncoder.encode(request.getPassword()));

        studentMapper.update(request, student);
        studentRepository.save(student);

        logger.info("Updated profile for student {}", userId);
    }

    @Transactional
    public void updateAdminPassword(AdminUpdateRequest request) {
        var userId = getLoggedInUserId();
        var user = userRepository.findById(UUID.fromString(userId)).orElseThrow();

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        logger.info("Updated password for admin {}", userId);
    }

    private static String getLoggedInUserId() {
        return (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
