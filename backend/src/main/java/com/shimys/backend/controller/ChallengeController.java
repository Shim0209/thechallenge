package com.shimys.backend.controller;

import com.google.gson.Gson;
import com.shimys.backend.domain.challenge.ChallengeTag;
import com.shimys.backend.security.auth.PrincipalDetails;
import com.shimys.backend.util.dto.CommonResponseDto;
import com.shimys.backend.util.dto.challenge.AssignmentCreateDto;
import com.shimys.backend.util.dto.challenge.ChallengeCreateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/challenge")
public class ChallengeController {

    @PostMapping("/create")
    public ResponseEntity<?> create(ChallengeCreateDto challengeCreateDto, @AuthenticationPrincipal PrincipalDetails principalDetails){
        System.out.println("ChallengeController create 받은 매개변수 : "+challengeCreateDto.toString());
        System.out.println("요청한 유저 : "+ principalDetails.getUsername());

        Gson gson = new Gson();
        AssignmentCreateDto[] assignmentCreateDto = gson.fromJson(challengeCreateDto.getAssignment(), AssignmentCreateDto[].class);
        for(AssignmentCreateDto dto : assignmentCreateDto){
            System.out.println(dto.toString());
        }

        ChallengeTag[] challengeTags = gson.fromJson(challengeCreateDto.getTag(),ChallengeTag[].class);
        for (ChallengeTag tag : challengeTags){
            System.out.println(tag.getTag());
        }

        // String 날짜 데이터를 LocalDate객체로 바꿔주는 클래스 만들기


        // 매개변수 dto, 유효성검사, Principaldetails 객체 필요

        // 유저정보 + 챌린저 생성 정보로 챌린지 생성

        return new ResponseEntity<>(new CommonResponseDto<>(1, "챌린지 생성 성공",null), HttpStatus.CREATED);
    }
}
