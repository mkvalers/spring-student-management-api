package com.mkv.studentmanagementapi.course.security;

import com.mkv.studentmanagementapi.common.security.SecurityRules;
import com.mkv.studentmanagementapi.user.entity.Roles;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.stereotype.Component;

@Component
public class CourseSecurityRules implements SecurityRules {
    @Override
    public void configure(AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry registry) {
        registry.requestMatchers(HttpMethod.GET, "/courses", "/courses/{id}").hasAnyRole(Roles.STUDENT.name(), Roles.ADMIN.name())
                .requestMatchers(HttpMethod.POST, "/courses").hasRole(Roles.ADMIN.name())
                .requestMatchers(HttpMethod.PUT, "/courses/{id}").hasRole(Roles.ADMIN.name())
                .requestMatchers(HttpMethod.DELETE, "/courses/{id}").hasRole(Roles.ADMIN.name());;
    }
}
