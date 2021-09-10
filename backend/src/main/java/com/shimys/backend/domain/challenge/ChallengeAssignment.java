package com.shimys.backend.domain.challenge;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.shimys.backend.domain.Challenge;
import com.shimys.backend.domain.assignment.AssignmentParagraph;
import com.shimys.backend.domain.assignment.AssignmentQuiz;
import com.shimys.backend.domain.assignment.AssignmentSubmit;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 과제 정보 저장
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnoreProperties({"assignments"})
    @JoinColumn(name = "challengeId")
    @ManyToOne(fetch = FetchType.EAGER)
    private Challenge challenge;

    private String image;

    private LocalDateTime submitDate; // 해당 과제의 날짜

    private String type; // 제출방식 -> URL, 파일, 퀴즈, TEXT

    private Long passScore; // 최소패스점수

    // OneToMany
    @JsonIgnoreProperties({"assignment"})
    @OneToMany(mappedBy = "assignment", fetch = FetchType.LAZY)
    private List<AssignmentParagraph> paragraphs;

    @JsonIgnoreProperties({"assignment"})
    @OneToMany(mappedBy = "assignment", fetch = FetchType.LAZY)
    private List<AssignmentQuiz> quiz;

    @JsonIgnoreProperties({"assignment"})
    @OneToMany(mappedBy = "assignment", fetch = FetchType.LAZY)
    private List<AssignmentSubmit> submits;
}
