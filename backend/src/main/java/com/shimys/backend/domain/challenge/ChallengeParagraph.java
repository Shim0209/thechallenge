package com.shimys.backend.domain.challenge;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.shimys.backend.domain.Challenge;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * 챌린지 설명
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeParagraph {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String text;

    @JsonIgnoreProperties({"paragraphs"})
    @JoinColumn(name = "challengeId")
    @ManyToOne(fetch = FetchType.LAZY)
    private Challenge challenge;
}
