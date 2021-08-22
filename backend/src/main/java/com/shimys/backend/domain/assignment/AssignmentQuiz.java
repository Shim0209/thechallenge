package com.shimys.backend.domain.assignment;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.shimys.backend.domain.challenge.ChallengeAssignment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

/**
 * 문제
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignmentQuiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnoreProperties({"quiz"})
    @JoinColumn(name = "assignmentId")
    @ManyToOne(fetch = FetchType.EAGER)
    private ChallengeAssignment assignment;


    private String quizText; // 문제
    private Long passScore; // 최소패스점수
    private String collectAnswer; // 정답


    @JsonIgnoreProperties({"assignmentQuiz"})
    @OneToMany(mappedBy = "assignmentQuiz", fetch = FetchType.LAZY)
    private List<QuizAnswer> quizAnswers; // 해당 문제의 객관식 보기
}
