package com.shimys.backend.domain.assignment;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * 객관식 보기
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "quizAnswer_uk",
                        columnNames = {"assignmentQuizId","answerText"}
                )
        }
)
public class QuizAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnoreProperties({"quizAnswers"})
    @JoinColumn(name = "assignmentQuizId")
    @ManyToOne(fetch = FetchType.EAGER)
    private AssignmentQuiz assignmentQuiz;

    private String answerText; // 보기 텍스트 저장
}
