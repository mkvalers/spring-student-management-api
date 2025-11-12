package com.mkv.studentmanagementapi.user.service;

import com.mkv.studentmanagementapi.student.mapper.StudentMapper;
import com.mkv.studentmanagementapi.student.repository.StudentRepository;
import com.mkv.studentmanagementapi.user.dto.UpdateInfoRequest;
import com.mkv.studentmanagementapi.user.entity.Roles;
import com.mkv.studentmanagementapi.user.mapper.UserMapper;
import com.mkv.studentmanagementapi.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@AllArgsConstructor
@Service
public class UserProfileService {

    private final PasswordEncoder passwordEncoder;
    private final UserAuthUtils userAuthUtils;
    private final UserMapper userMapper;
    private final StudentMapper studentMapper;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;

    public <T> T me() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        var userId = (String) authentication.getPrincipal();

        if(userAuthUtils.hasRole(authentication, Roles.ADMIN)) {
            var user = userRepository.findById(UUID.fromString(userId)).orElseThrow();
            return (T) userMapper.toAdminDto(user);
        }

        var user = studentRepository.findByUserId(UUID.fromString(userId)).orElseThrow();

        return (T) studentMapper.toStudentResponse(user);
    }

    public void updateInfo(UpdateInfoRequest request) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        var userId = (String) authentication.getPrincipal();

        var student = studentRepository.findByUserId(UUID.fromString(userId)).orElseThrow();

        if(request.getPassword() != null)
            student.setUserPassword(passwordEncoder.encode(request.getPassword()));

        studentMapper.update(request,student);

        studentRepository.save(student);
    }

}
