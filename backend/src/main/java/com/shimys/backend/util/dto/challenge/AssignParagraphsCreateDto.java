package com.shimys.backend.util.dto.challenge;

import com.shimys.backend.domain.assignment.AssignmentParagraph;
import com.shimys.backend.domain.challenge.ChallengeAssignment;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class AssignParagraphsCreateDto {
    @NotBlank(message = "title은 필수 입력 값입니다.")
    private String title;
    @NotBlank(message = "text는 필수 입력 값입니다.")
    private String text;
    @NotBlank(message = "assignId는 필수 입력 값입니다.")
    private Long assignId;

    public AssignmentParagraph toAssignmentParagraphs(ChallengeAssignment challengeAssignment){
        return AssignmentParagraph.builder()
                .title(title)
                .text(text)
                .assignment(challengeAssignment)
                .build();
    }
}
