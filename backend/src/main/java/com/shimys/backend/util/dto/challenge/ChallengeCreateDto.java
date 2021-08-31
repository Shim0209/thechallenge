package com.shimys.backend.util.dto.challenge;

import com.shimys.backend.domain.Challenge;
import lombok.Data;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Data
public class ChallengeCreateDto {
    private String title;
    private MultipartFile image;
    private String startDate;
    private String endDate;
    private String assignment;
    // 날짜별 제출 타입을 리스트 형태로 받아와야함

    // title, image, startDate, endDate로 challenge.toEntry() 만들어야함
//    public Challenge toChallengeEntity(String imageUrl, LocalDateTime startDate, LocalDateTime endDate){
//        return Challenge.builder()
//                .title(title)
//                .mainImageUrl(imageUrl)
//                .startDate(startDate)
//                .endDate(endDate)
//                .build();
//    }

    // 날짜별 제출 타입으로 challengeAssignment.toEntry() 만들어야함
}
