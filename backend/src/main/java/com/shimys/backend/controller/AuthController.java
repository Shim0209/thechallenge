package com.shimys.backend.controller;

import com.shimys.backend.domain.User;
import com.shimys.backend.repository.UserRepository;
import com.shimys.backend.service.AuthService;
import com.shimys.backend.util.dto.CommonResponseDto;
import com.shimys.backend.util.dto.auth.SignupDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid SignupDto signupDto, BindingResult bindingResult){
        User user = signupDto.toEntity(); // 받은 정보로 user객체 생성
        User userEntity = authService.회원가입(user);

        return new ResponseEntity<>(new CommonResponseDto<>(1, "회원가입 성공", userEntity.getId()), HttpStatus.CREATED);
    }
}
