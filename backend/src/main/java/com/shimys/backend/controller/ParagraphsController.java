package com.shimys.backend.controller;

import com.shimys.backend.domain.Challenge;
import com.shimys.backend.domain.challenge.ChallengeParagraph;
import com.shimys.backend.security.auth.PrincipalDetails;
import com.shimys.backend.service.ParagraphsService;
import com.shimys.backend.util.dto.CommonResponseDto;
import com.shimys.backend.util.dto.challenge.ChallengeCreateDto;
import com.shimys.backend.util.dto.challenge.ParagraphsCreateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/paragraphs")
public class ParagraphsController {

    private final ParagraphsService paragraphsService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ParagraphsCreateDto paragraphsCreateDto) {
        System.out.println("ParagraphsController create() 실행" + paragraphsCreateDto);
        ChallengeParagraph challengeParagraphEntity = paragraphsService.단락생성(paragraphsCreateDto);
        return new ResponseEntity<>(new CommonResponseDto<>(1, "단락 생성 성공", challengeParagraphEntity), HttpStatus.CREATED);
    }
}
