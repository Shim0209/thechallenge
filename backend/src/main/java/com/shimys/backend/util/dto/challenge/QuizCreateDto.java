package com.shimys.backend.util.dto.challenge;

import com.shimys.backend.domain.assignment.AssignmentQuiz;
import com.shimys.backend.domain.assignment.QuizAnswer;
import com.shimys.backend.domain.challenge.ChallengeAssignment;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class QuizCreateDto {
    @NotBlank(message = "quizText는 필수 입력 값입니다.")
    private String quizText;
    @NotBlank(message = "collectAnswer은 필수 입력 값입니다.")
    private String collectAnswer;
    @NotBlank(message = "assignId는 필수 입력 값입니다.")
    private Long assignId;
    @NotBlank(message = "quizAnswers은 필수 입력 값입니다.")
    private String quizAnswers;

    public AssignmentQuiz toAssignmentQuiz(ChallengeAssignment challengeAssignment){
        return AssignmentQuiz.builder()
                .quizText(quizText)
                .collectAnswer(collectAnswer)
                .assignment(challengeAssignment)
                .build();
    }

    public QuizAnswer toQuizAnswer(String answerText, AssignmentQuiz assignmentQuiz){
        return QuizAnswer.builder()
                .answerText(answerText)
                .assignmentQuiz(assignmentQuiz)
                .build();
    }

}
