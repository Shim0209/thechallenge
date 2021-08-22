package com.shimys.backend.domain.assignment;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.shimys.backend.domain.challenge.ChallengeAssignment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * 각 과제의 내용
 * 1개의 과제에 여러개 만들 수 있음
 * 타이틀, 내용 구조
 * 예1)
 * 타이틀 : 제출날짜 공지
 * 내용 : 다음날 오전 6시까지 제출. 미제출시 다음날부터 과제참여 불가 및 챌린지 탈락
 * 예2)
 * 타이틀 : 코드 제출 방법
 * 내용 : Codesandbox에 코드 작성 후 URL첨부. 완벽히 동작하지 않을경우 탈락됨
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignmentParagraph {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String text;

    @JsonIgnoreProperties({"paragraphs"})
    @JoinColumn(name = "assignmentId")
    @ManyToOne(fetch = FetchType.EAGER)
    private ChallengeAssignment assignment;
}
