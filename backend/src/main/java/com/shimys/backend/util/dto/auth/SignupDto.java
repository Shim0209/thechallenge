package com.shimys.backend.util.dto.auth;

import com.shimys.backend.domain.User;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class SignupDto {

    @Size(min = 5, max = 20, message = "ID는 5자 이상 20자 이하여야 합니다.")
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    @NotBlank
    private String name;
    @NotBlank
    private String email;

    public User toEntity(){
        return User.builder()
                .username(username)
                .password(password)
                .name(name)
                .email(email)
                .build();
    }
}
