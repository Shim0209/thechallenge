package com.shimys.backend.domain;

import com.shimys.backend.domain.challenge.*;

import java.time.LocalDateTime;
import java.util.List;

public class Challenge {
    private Long id;
    private String title;   // 타이틀
    private LocalDateTime createDate;   // 생성날짜
    private LocalDateTime startDate;    // 시작날짜
    private LocalDateTime endDate;      // 끝날짜
    private String mainImageUrl;    // 메인이미지
    private String status;  // 대기, 진행, 종료

    // ManyToOne
    private User host; // 방장

    // OneToMany
    private List<ChallengeTag> tag; // 태그
    private List<ChallengeAssignment> subject; // 과제
    private List<ChallengeParticipant> participant; // 대기자, 참가자
    private List<ChallengeParagraph> paragraph; // 단락 -> 타이틀, 내용
    private List<ChallengeGraduate> graduate; // 수료자
}
