package com.shimys.backend.service;

import com.google.gson.Gson;
import com.shimys.backend.domain.Challenge;
import com.shimys.backend.domain.User;
import com.shimys.backend.domain.challenge.ChallengeAssignment;
import com.shimys.backend.domain.challenge.ChallengeTag;
import com.shimys.backend.repository.ChallengeAssignmentRepository;
import com.shimys.backend.repository.ChallengeRepository;
import com.shimys.backend.repository.ChallengeTagRepository;
import com.shimys.backend.security.auth.PrincipalDetails;
import com.shimys.backend.util.dto.challenge.AssignmentCreateDto;
import com.shimys.backend.util.dto.challenge.ChallengeCreateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChallengeService {

    @Value("${file.challengeImagePath}")
    private String challengeImageFolder;

    private final ChallengeRepository challengeRepository;
    private final ChallengeAssignmentRepository challengeAssignmentRepository;
    private final ChallengeTagRepository challengeTagRepository;

    /**
     * 챌랜지 생성, 챌랜지 과제 생성, 챌린지 태그 생성
     *
     * @param challengeCreateDto 챌랜지 생성에 필요한 정보
     * @param principalDetails 유저정보(host)
     * @return 생성한 챌린지 정보
     */
    @Transactional
    public Challenge 챌린지생성(ChallengeCreateDto challengeCreateDto, PrincipalDetails principalDetails) throws IOException {
        Gson gson = new Gson();

        // 1. 챌린지 등록
        // 이미지 파일 저장 (with UUID)
        UUID uuid = UUID.randomUUID();
        String imageName = uuid+"_"+challengeCreateDto.getImage().getOriginalFilename();

        Path imageFilePath = Paths.get(challengeImageFolder+imageName);

        try {
            Files.write(imageFilePath, challengeCreateDto.getImage().getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 날짜 데이터로 LocalDate 객체 만들기
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startDate = LocalDateTime.parse(challengeCreateDto.getStartDate(), formatter);
        LocalDateTime endDate = LocalDateTime.parse(challengeCreateDto.getEndDate(), formatter);

        // Challenge객체 만들어서 생성
        Challenge challenge = challengeCreateDto.toChallengeEntity(imageName, startDate, endDate, principalDetails);
        Challenge challengeEntity = challengeRepository.save(challenge);

        // 2. 챌린지 Assignment 등록
        List<ChallengeAssignment> challengeAssignmentList = new ArrayList<>();
        AssignmentCreateDto[] assignmentCreateDto = gson.fromJson(challengeCreateDto.getAssignment(), AssignmentCreateDto[].class);
        for(AssignmentCreateDto dto : assignmentCreateDto){
            ChallengeAssignment challengeAssignment = challengeCreateDto.toChallengeAssignmentEntity(challengeEntity, LocalDateTime.parse(dto.getDay(), formatter), dto.getOption());
            ChallengeAssignment challengeAssignmentEntity = challengeAssignmentRepository.save(challengeAssignment);
            challengeAssignmentList.add(challengeAssignmentEntity);
        }

        // 3. 챌린지 Tag 등록
        List<ChallengeTag> challengeTagList = new ArrayList<>();
        ChallengeTag[] challengeTags = gson.fromJson(challengeCreateDto.getTag(),ChallengeTag[].class);
        for (ChallengeTag tag : challengeTags){
            tag.setChallenge(challenge);
            ChallengeTag challengeTagEntity = challengeTagRepository.save(tag);
            challengeTagList.add(challengeTagEntity);
        }

        // 이미지 바이트 담기
        byte[] imageByte = challengeCreateDto.getImage().getBytes();
        challengeEntity.setImageByte(imageByte);
        System.out.println("이미지 : " + imageByte.toString());

        // 해당 챌린지의 과제, 태그 데이터 담기
        challengeEntity.setAssignments(challengeAssignmentList);
        challengeEntity.setTags(challengeTagList);

        // 유저 객체 변경 (정보보호를 위해서)
        challengeEntity.setHost(challengeEntity.toSimpleUser(challengeEntity));

        return challengeEntity;
    }

    @Transactional
    public Optional<Challenge> 챌린지찾기(Long challengeId){
        Optional<Challenge> result = challengeRepository.findById(challengeId);
        result.get().setHost(result.get().toSimpleUser(result.get()));
        return result;
    }
}
