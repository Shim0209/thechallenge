package com.shimys.backend.util.dto.auth;

import com.shimys.backend.domain.User;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class SignupDto {

    @NotBlank(message = "Username은 필수 입력 값입니다.")
    @Pattern(regexp = "[A-Za-z]{1}[A-Za-z0-9_-]{3,19}$",
            message = "Username은 영문 대/소문자 시작, 영문/숫자/- 사용, 4 ~ 20자 구성이어야 합니다.")
    private String username;

    @NotBlank(message = "Password는 필수 입력 값입니다.")
    @Pattern(regexp = "(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
            message = "Password는 영문 대/소문자, 숫자, 특수기호가 최소 1개 이상씩 포함된 8자 이상의 구성이어야 합니다.")
    private String password;

    @NotBlank(message = "Name은 필수 입력 값입니다.")
    @Pattern(regexp = "[가-힣a-zA-Z]+$",
            message = "Name은 한글, 영문만 구성되어야 합니다.")
    private String name;

    @NotBlank(message = "Email은 필수 입력 값입니다.")
    @Pattern(regexp = "[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}$",
            message = "Email 형식이여야 합니다.")
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
