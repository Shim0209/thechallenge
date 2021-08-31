package com.shimys.backend.util.aop;

import com.shimys.backend.util.exception.CustomValidationException;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

@Component
@Aspect
public class ValidationAdvice {

    @Around("execution(* com.shimys.backend.controller.*Controller.*(..))")
    public Object advice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("유효성검사 AOP 동작");

        Object[] args = proceedingJoinPoint.getArgs();
        for(Object arg : args){
            if(arg instanceof BindingResult){
                BindingResult bindingResult = (BindingResult) arg;

                if(bindingResult.hasErrors()){
                    Map<String, String> errorMap = new HashMap<>();

                    for(FieldError error : bindingResult.getFieldErrors()){
                        errorMap.put(error.getField(), error.getDefaultMessage());
                    }

                    throw new CustomValidationException("유효성 검사 실패",errorMap);
                }
            }
        }

        return proceedingJoinPoint.proceed();
    }
}
