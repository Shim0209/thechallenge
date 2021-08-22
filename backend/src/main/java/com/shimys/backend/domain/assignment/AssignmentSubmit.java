package com.shimys.backend.domain.assignment;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.shimys.backend.domain.User;
import com.shimys.backend.domain.challenge.ChallengeAssignment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 과제 제출 정보를 저장
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignmentSubmit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnoreProperties({"submits"})
    @JoinColumn(name = "assignmentId")
    @ManyToOne(fetch = FetchType.EAGER)
    private ChallengeAssignment assignment;

    @JsonIgnoreProperties({"challenges"})
    @JoinColumn(name = "userId")
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    private String fileUrl; // 서버내 파일저장위치

    private String refUrl; // 외부 참조 주소 -> 코드샌드박스, 리플 등

    private String text; // 주관식 답변

    private Long score; // 객관식 문제일 경우 해당 과제의 점수 저장

    private LocalDateTime createDate;
    public void createDate(){
        this.createDate = LocalDateTime.now();
    }
}
