package com.shimys.backend.util;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.shimys.backend.util.dto.CommonResponseDto;
import com.shimys.backend.util.exception.CustomException;
import com.shimys.backend.util.exception.CustomValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;

@RestController
@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> customException(CustomException e){
        return new ResponseEntity<>(new CommonResponseDto<>(-1, e.getMessage(), null), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomValidationException.class)
    public ResponseEntity<?> customValidationException(CustomValidationException e){
        return new ResponseEntity<>(new CommonResponseDto<>(-1, e.getMessage(), e.getErrorMap()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<?> noSuchElementException(NoSuchElementException e){
        return new ResponseEntity<>(new CommonResponseDto<>(-1, "챌린지 찾기 실패", e.getMessage()), HttpStatus.NOT_FOUND);
    }
}
