package com.shimys.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.shimys.backend.domain.challenge.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Challenge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;   // 타이틀
    private String mainImageUrl;    // 메인이미지
    private String status;  // 대기, 진행, 종료
    private LocalDateTime startDate;    // 시작날짜
    private LocalDateTime endDate;      // 끝날짜
    private LocalDateTime createDate;   // 생성날짜
    private boolean isAvailable;

    @PrePersist
    public void createDate(){
        this.createDate = LocalDateTime.now();
    }

    // ManyToOne
    @JsonIgnoreProperties({"challenges"}) // 무한참조방지
    @JoinColumn(name = "hostId") // DB에 저장될 컬럼명
    @ManyToOne
    private User host; // 방장

    // OneToMany
    // [***] => JPA에서 Fetch Join 조건은 1.ToOne은 몇개든 가능 / 2.ToMany는 1개만 가능
    @JsonIgnoreProperties({"challenge"})
    @OneToMany(mappedBy = "challenge", fetch = FetchType.LAZY)
    private List<ChallengeTag> tags; // 태그

    @JsonIgnoreProperties({"challenge"})
    @OneToMany(mappedBy = "challenge", fetch = FetchType.LAZY)
    private List<ChallengeParticipant> participants; // 대기자, 참가자

    @JsonIgnoreProperties({"challenge"})
    @OneToMany(mappedBy = "challenge", fetch = FetchType.LAZY)
    private List<ChallengeParagraph> paragraphs; // 단락 -> 타이틀, 내용

    @JsonIgnoreProperties({"challenge"})
    @OneToMany(mappedBy = "challenge", fetch = FetchType.LAZY)
    private List<ChallengeGraduate> graduates; // 수료자

    @JsonIgnoreProperties({"challenge"})
    @OneToMany(mappedBy = "challenge", fetch = FetchType.LAZY)
    private List<ChallengeAssignment> assignments; // 과제
}
