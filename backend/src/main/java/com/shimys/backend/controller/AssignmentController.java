package com.shimys.backend.controller;

import com.shimys.backend.domain.assignment.AssignmentQuiz;
import com.shimys.backend.service.AssignmentService;
import com.shimys.backend.util.dto.CommonResponseDto;
import com.shimys.backend.util.dto.challenge.QuizCreateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/assignment")
public class AssignmentController {

    private final AssignmentService assignmentService;

    @PostMapping("/quiz/create")
    public ResponseEntity<?> createQuizAndAnswer(@RequestBody QuizCreateDto quizCreateDto){
        AssignmentQuiz assignmentQuizEntity = assignmentService.퀴즈생성(quizCreateDto);

        return new ResponseEntity<>(new CommonResponseDto<>(1, "퀴즈 생성 성공", assignmentQuizEntity), HttpStatus.CREATED);
    }
}
