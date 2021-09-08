package com.shimys.backend.util.dto.challenge;

import com.shimys.backend.domain.Challenge;
import com.shimys.backend.domain.challenge.ChallengeParagraph;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ParagraphsCreateDto {

    @NotBlank(message = "title은 필수 입력 값입니다.")
    private String title;
    @NotBlank(message = "text는 필수 입력 값입니다.")
    private String text;
    @NotBlank(message = "challengeId는 필수 입력 값입니다.")
    private Long challengeId;

    public ChallengeParagraph toParagraphsEntity(Challenge challenge){
        return ChallengeParagraph.builder()
                .title(title)
                .text(text)
                .challenge(challenge)
                .build();
    }
}
