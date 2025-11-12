package com.mkv.studentmanagementapi.enrollment.security;

import com.mkv.studentmanagementapi.common.security.SecurityRules;
import com.mkv.studentmanagementapi.user.entity.Roles;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.stereotype.Component;

@Component
public class EnrollmentSecurityRules implements SecurityRules {
    @Override
    public void configure(AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry registry) {
        registry.requestMatchers(HttpMethod.POST, "/enrollments").hasRole(Roles.STUDENT.name())
                .requestMatchers(HttpMethod.GET, "/enrollments/me").hasRole(Roles.STUDENT.name())
                .requestMatchers(HttpMethod.DELETE, "enrollments/{enrollmentId}").hasRole(Roles.STUDENT.name())
                .requestMatchers(HttpMethod.GET, "/enrollments/students/{studentId}").hasRole(Roles.ADMIN.name())
                .requestMatchers(HttpMethod.GET, "/enrollments/courses/{courseId}").hasRole(Roles.ADMIN.name());

    }
}
