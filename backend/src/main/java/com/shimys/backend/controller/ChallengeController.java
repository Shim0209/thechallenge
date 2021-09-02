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

@RequiredArgsConstructor
@RestController
@RequestMapping("/challenge")
public class ChallengeController {

    private final ChallengeService challengeService;

    @PostMapping("/create")
    public ResponseEntity<?> create(ChallengeCreateDto challengeCreateDto, @AuthenticationPrincipal PrincipalDetails principalDetails){
        Challenge challengeEntity = challengeService.챌린지생성(challengeCreateDto, principalDetails);

        return new ResponseEntity<>(new CommonResponseDto<>(1, "챌린지 생성 성공", challengeEntity), HttpStatus.CREATED);
    }
}
