package com.shimys.backend.util.dto.challenge;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.constraints.NotBlank;

@Data
public class ChallengeUpdateDto {

    @NotBlank(message = "title은 필수 입력 값입니다.")
    private String title;
    private MultipartFile image;
    private String tags;
    private Long challengeId;
}