package com.mkv.studentmanagementapi.user.mapper;

import com.mkv.studentmanagementapi.user.dto.AdminResponse;
import com.mkv.studentmanagementapi.user.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    AdminResponse toAdminDto(User user);
}
