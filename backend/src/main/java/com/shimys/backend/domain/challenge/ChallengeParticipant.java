package com.shimys.backend.domain.challenge;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.shimys.backend.domain.Challenge;
import com.shimys.backend.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * 대기자, 참가자
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnoreProperties({"challenges"}) // user조회시 challenges를 무시하지 않으면 challengeParticipant를 참조하게 됨 -> 무한참조 발생
    @JoinColumn(name = "userId")
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @JsonIgnoreProperties({"participants"})
    @JoinColumn(name = "challengeId")
    @ManyToOne(fetch = FetchType.EAGER)
    private Challenge challenge;

    private Integer min;
    private Integer max;
    private boolean isAvailable;
}
