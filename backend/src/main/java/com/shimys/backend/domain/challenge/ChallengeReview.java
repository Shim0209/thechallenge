package com.shimys.backend.domain.challenge;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.shimys.backend.domain.Challenge;
import com.shimys.backend.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "challengeReview_uk",
                        columnNames = {"userId","challengeId"}
                )
        }
)
public class ChallengeReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 단방향
    @JoinColumn(name = "challengeId") // 테이블 컬럼명
    @ManyToOne
    private Challenge challenge;

    // 단방향
    @JsonIgnoreProperties({"challenges"}) // user조회시 challenges를 무시하지 않으면 challengeParticipant를 참조하게 됨 -> 무한참조 발생
    @JoinColumn(name = "userId")
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    private String review; // 리뷰
    private Integer score;  // 별 갯수 1~5
}
