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
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/duplication")
    public ResponseEntity<?> duplicationCheckUsername(@RequestParam String username){
        User userEntity = userRepository.findByUsername(username);

        if(userEntity != null) {
            return new ResponseEntity<>(new CommonResponseDto<>(-1,"중복된 아이디 입니다.",username), HttpStatus.OK);
        }
        return new ResponseEntity<>(new CommonResponseDto<>(1,"사용할 수 있는 아이디 입니다.",username), HttpStatus.OK);
    }

    @GetMapping("/email")
    public ResponseEntity<?> emailCheck(@RequestParam String email){
        System.out.println("emailCheck 동작 : " + email);
        Integer code = authService.이메일인증(email);

        if(code == -1){
            new ResponseEntity<>(new CommonResponseDto<>(-1, "이미 사용중인 Email 입니다.",null), HttpStatus.OK);
        }

        return new ResponseEntity<>(new CommonResponseDto<>(1, "이메일 인증번호 전송 성공",code), HttpStatus.OK);
    }
}
