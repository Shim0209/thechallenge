package com.shimys.backend.controller;

import com.shimys.backend.domain.Challenge;
import com.shimys.backend.security.auth.PrincipalDetails;
import com.shimys.backend.service.ChallengeService;
import com.shimys.backend.util.dto.CommonResponseDto;
import com.shimys.backend.util.dto.challenge.ChallengeCreateDto;
import com.shimys.backend.util.dto.challenge.ChallengeUpdateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/challenge")
public class ChallengeController {

    @Value("${file.challengeImagePath}")
    private String challengeImageFolder;

    private final ChallengeService challengeService;

    @PostMapping("/create")
    public ResponseEntity<?> create(ChallengeCreateDto challengeCreateDto, @AuthenticationPrincipal PrincipalDetails principalDetails) throws IOException {
        Challenge challengeEntity = challengeService.챌린지생성(challengeCreateDto, principalDetails);
        // 챌린지 생성후 /challenge/manage/{생성한 챌린지 id} 페이지로 이동.
        return new ResponseEntity<>(new CommonResponseDto<>(1, "챌린지 생성 성공", challengeEntity), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> challenge(@PathVariable Long id) throws IOException {
        Optional<Challenge> challengeEntity = challengeService.챌린지찾기(id);

        return new ResponseEntity<>(new CommonResponseDto<>(1, "챌린지 찾기 성공", challengeEntity.get()), HttpStatus.OK);
    }

    @GetMapping("/mychallenge")
    public ResponseEntity<?> myChallenge(@AuthenticationPrincipal PrincipalDetails principalDetails) throws IOException {
        List<Challenge> challengeEntityList = challengeService.나의챌린지찾기(principalDetails.getUser().getId());

        return new ResponseEntity<>(new CommonResponseDto<>(1, "챌린지 찾기 성공", challengeEntityList), HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(ChallengeUpdateDto challengeUpdateDto) {
        System.out.println("챌린지 서비스 업데이트 : " + challengeUpdateDto.toString());
        int result = challengeService.챌린지업데이트(challengeUpdateDto);

        System.out.println("챌린지 서비스 결과 : " + result);
        if(result == -1){
            return new ResponseEntity<>(new CommonResponseDto<>(1, "챌린지 정보수정 실패", null), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new CommonResponseDto<>(1, "챌린지 정보수정 성공", null), HttpStatus.OK);
    }
}
