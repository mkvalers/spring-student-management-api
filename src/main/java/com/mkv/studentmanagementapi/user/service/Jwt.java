package com.mkv.studentmanagementapi.user.service;

import com.mkv.studentmanagementapi.user.entity.Roles;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class Jwt {

    private final Claims claims;
    private final SecretKey secretKey;

    public Jwt(Claims claims, SecretKey secretKey) {
        this.claims = claims;
        this.secretKey = secretKey;
    }

    public boolean isExpired() {
        return claims.getExpiration().before(new Date());
    }

    public UUID getUserId() {
        return UUID.fromString(claims.getSubject());
    }

    public List<Roles> getRoles() {
        String rolesClaim = claims.get("role", String.class);
        if (rolesClaim == null || rolesClaim.isBlank()) return List.of();

        return Arrays.stream(rolesClaim.split(","))
                .map(String::trim)
                .map(Roles::valueOf)
                .toList();
    }

    public String toString() {
        return Jwts.builder().claims(claims).signWith(secretKey).compact();
    }
}
