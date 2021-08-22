package com.shimys.backend.domain.challenge;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.shimys.backend.domain.Challenge;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * 키워드
 * 검색, 보여주기 등 사용
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "challengeTags_uk",
                        columnNames = {"tagName","challengeId"}
                )
        }
)
public class ChallengeTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tagName;

    // ManyToOne
    @JsonIgnoreProperties({"tags"})
    @JoinColumn(name = "challengeId") // 테이블 컬럼명
    @ManyToOne
    private Challenge challenge;
}
