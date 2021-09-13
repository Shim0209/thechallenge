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
import com.shimys.backend.util.dto.challenge.ChallengeUpdateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
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

    private final Gson gson;
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

        // 1. 챌린지 등록
        // 이미지 파일 저장 (with UUID)
        String imageName = saveImage(challengeCreateDto.getImage());

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

    @Transactional(readOnly = true)
    public Optional<Challenge> 챌린지찾기(Long challengeId) throws IOException{
        Optional<Challenge> result = challengeRepository.findById(challengeId);
        // 유저 객체 변경
        result.get().setHost(result.get().toSimpleUser(result.get()));


        // 이미지를 byte[] 형태로 담기
        InputStream in = new FileInputStream(challengeImageFolder+result.get().getImage());
        result.get().setImageByte(in.readAllBytes());
        return result;
    }

    @Transactional(readOnly = true)
    public List<Challenge> 나의챌린지찾기(Long hostId) throws IOException {
        List<Challenge> result = challengeRepository.findChallengesByHost(hostId);
        return result;
    }

    @Transactional
    public int 챌린지업데이트(ChallengeUpdateDto challengeUpdateDto) {
        Challenge challengeEntity = challengeRepository.findById(challengeUpdateDto.getChallengeId()).get();
        // 이미지를 폴더에 저장
        String imageName = saveImage(challengeUpdateDto.getImage());
        // 기존 이미지를 폴더에서 삭제
        deleteImageFromFolder(challengeEntity.getImage());
        // 타이틀, 이미지 업데이트
        int updateResult = challengeRepository
                .updateChallengeTitleAndImageById(
                        challengeUpdateDto.getChallengeId(),
                        challengeUpdateDto.getTitle(),
                        imageName
                );
        // 해당 챌린지의 모든 태그 삭제
        int deleteTagResult = challengeRepository.deleteChallengeTagById(challengeUpdateDto.getChallengeId());
        // 챌린지 태그 새로 등록
        ChallengeTag[] challengeTags = gson.fromJson(challengeUpdateDto.getTags() ,ChallengeTag[].class);
        for (ChallengeTag tag : challengeTags){
            tag.setChallenge(challengeEntity);
            challengeTagRepository.save(tag);
        }

        System.out.println("체크 updateResult : " + updateResult);
        System.out.println("체크 deleteTagResult : " + deleteTagResult);
        if (updateResult == 1 && deleteTagResult == 3) {
            return 1;
        }
        return -1;
    }

    /**
     * 이미지를 서버 폴더에 저장한다.
     * @param image 멀티파트파일
     * @return 폴더에 저장된 이미지 이름
     */
    public String saveImage(MultipartFile image){
        UUID uuid = UUID.randomUUID();
        String imageName = uuid+"_"+image.getOriginalFilename();

        Path imageFilePath = Paths.get(challengeImageFolder+imageName);

        try {
            Files.write(imageFilePath, image.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return imageName;
    }

    /**
     * 이미지를 서버 폴더에서 삭제한다.
     * @param imageName 폴더에 저장된 이미지 이름
     * @return 성공 : 1, 실패 : -1
     */
    public void deleteImageFromFolder(String imageName){
        File imageFolder = new File(challengeImageFolder);

        if(imageFolder.exists()){
            File[] imageList = imageFolder.listFiles();

            for(File image : imageList){
                if(image.getName().equals(imageName)){
                    image.delete();
                    return;
                }
            }
        }
    }


}
