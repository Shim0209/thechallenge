package com.shimys.backend.service;

import com.google.gson.Gson;
import com.shimys.backend.domain.assignment.AssignmentQuiz;
import com.shimys.backend.domain.assignment.QuizAnswer;
import com.shimys.backend.domain.challenge.ChallengeAssignment;
import com.shimys.backend.repository.AssignmentQuizRepository;
import com.shimys.backend.repository.ChallengeAssignmentRepository;
import com.shimys.backend.repository.QuizAnswerRepository;
import com.shimys.backend.util.dto.challenge.QuizCreateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AssignmentService {

    private final ChallengeAssignmentRepository challengeAssignmentRepository;
    private final AssignmentQuizRepository assignmentQuizRepository;
    private final QuizAnswerRepository quizAnswerRepository;
    private final Gson gson;

    @Transactional
    public AssignmentQuiz 퀴즈생성(QuizCreateDto quizCreateDto) {
        // 퀴즈 생성에 필요한 챌린지과제 객체 조회
        ChallengeAssignment challengeAssignmentEntity = challengeAssignmentRepository.findById(quizCreateDto.getAssignId()).get();
        // 퀴즈 객체 만들어서 DB저장
        AssignmentQuiz assignmentQuiz = quizCreateDto.toAssignmentQuiz(challengeAssignmentEntity);
        AssignmentQuiz assignmentQuizEntity = assignmentQuizRepository.save(assignmentQuiz);

        // 퀴즈의 객관식 문항 문자열을 받아 객체로 만들어서 DB저장
        List<QuizAnswer> quizAnswerList = new ArrayList<>();
        QuizAnswer[] quizAnswers = gson.fromJson(quizCreateDto.getQuizAnswers(), QuizAnswer[].class);
        for(QuizAnswer quizAnswer : quizAnswers){
            quizAnswer.setAssignmentQuiz(assignmentQuizEntity);
            QuizAnswer quizAnswerEntity = quizAnswerRepository.save(quizAnswer);
            quizAnswerList.add(quizAnswerEntity);
        }
        // 퀴즈 객체에 객관식 문항 객체배열 담기
        assignmentQuizEntity.setQuizAnswers(quizAnswerList);

        return assignmentQuizEntity;
    }
}
