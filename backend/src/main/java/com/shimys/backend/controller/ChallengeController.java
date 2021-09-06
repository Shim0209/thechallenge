package com.shimys.backend.controller;

import com.shimys.backend.domain.Challenge;
import com.shimys.backend.repository.ChallengeAssignmentRepository;
import com.shimys.backend.repository.ChallengeRepository;
import com.shimys.backend.security.auth.PrincipalDetails;
import com.shimys.backend.service.ChallengeService;
import com.shimys.backend.util.dto.CommonResponseDto;
import com.shimys.backend.util.dto.challenge.ChallengeCreateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/challenge")
public class ChallengeController {

    private final ChallengeService challengeService;

    @PostMapping("/create")
    public ResponseEntity<?> create(ChallengeCreateDto challengeCreateDto, @AuthenticationPrincipal PrincipalDetails principalDetails){
        Challenge challengeEntity = challengeService.챌린지생성(challengeCreateDto, principalDetails);
        // 챌린지 생성후 /challenge/manage/{생성한 챌린지 id} 페이지로 이동.
        return new ResponseEntity<>(new CommonResponseDto<>(1, "챌린지 생성 성공", challengeEntity), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> challenge(@PathVariable Long id) throws IOException {
        Challenge challengeEntity = challengeService.챌린지찾기(id);

        // 이미지 byte[]로 리턴 => 클래스로 분리하기!!
        InputStream in = getClass().getResourceAsStream("/static/images/"+challengeEntity.getMainImageUrl());
        List result = new ArrayList();
        result.add(challengeEntity);
        result.add(in.readAllBytes());

        return new ResponseEntity<>(new CommonResponseDto<>(1, "챌린지 찾기 성공", result), HttpStatus.CREATED);
    }
}
