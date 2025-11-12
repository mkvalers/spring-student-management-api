package com.mkv.studentmanagementapi.admin;

import com.mkv.studentmanagementapi.common.security.SecurityRules;
import com.mkv.studentmanagementapi.user.entity.Roles;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.stereotype.Component;

@Component
public class AdminSecurityRules implements SecurityRules {
    @Override
    public void configure(AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry registry) {
        registry.requestMatchers(HttpMethod.GET, "/dashboard/stats").hasRole(Roles.ADMIN.name());
    }
}
