package com.mkv.studentmanagementapi.user.service;

import com.mkv.studentmanagementapi.common.config.JwtConfig;
import com.mkv.studentmanagementapi.user.entity.Roles;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserAuthUtils {

    private final JwtConfig jwtConfig;

    public void createCookie(HttpServletResponse response, Jwt refreshToken) {
        var cookie = new Cookie("refreshToken", refreshToken.toString());
        cookie.setHttpOnly(true);
        cookie.setPath("/auth/refresh");
        cookie.setMaxAge(jwtConfig.getRefreshTokenExpiration());
        cookie.setSecure(true);
        response.addCookie(cookie);
    }

    public void DestroyCookie(HttpServletResponse response) {
        var cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/auth/refresh");
        cookie.setMaxAge(0);
        cookie.setSecure(true);
        response.addCookie(cookie);
    }

    public boolean hasRole(Authentication auth, Roles role) {
        return auth.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_" + role.name()));
    }

}
