package com.shimys.backend.service;

import com.shimys.backend.domain.Challenge;
import com.shimys.backend.domain.assignment.AssignmentParagraph;
import com.shimys.backend.domain.challenge.ChallengeAssignment;
import com.shimys.backend.domain.challenge.ChallengeParagraph;
import com.shimys.backend.repository.AssignmentParagraphRepository;
import com.shimys.backend.repository.ChallengeAssignmentRepository;
import com.shimys.backend.repository.ChallengeParagraphsRepository;
import com.shimys.backend.repository.ChallengeRepository;
import com.shimys.backend.util.dto.challenge.AssignParagraphsCreateDto;
import com.shimys.backend.util.dto.challenge.ParagraphsCreateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ParagraphsService {

    private final ChallengeRepository challengeRepository;
    private final ChallengeParagraphsRepository challengeParagraphsRepository;
    private final ChallengeAssignmentRepository challengeAssignmentRepository;
    private final AssignmentParagraphRepository assignmentParagraphRepository;

    public ChallengeParagraph 단락생성(ParagraphsCreateDto paragraphsCreateDto){
        Challenge challengeEntity = challengeRepository.findById(paragraphsCreateDto.getChallengeId()).get();
        ChallengeParagraph challengeParagraph = paragraphsCreateDto.toParagraphsEntity(challengeEntity);
        return challengeParagraphsRepository.save(challengeParagraph);
    }

    public AssignmentParagraph 과제단란생성(AssignParagraphsCreateDto assignParagraphsCreateDto) {
        ChallengeAssignment challengeAssignmentEntity = challengeAssignmentRepository.findById(assignParagraphsCreateDto.getAssignId()).get();
        if(assignParagraphsCreateDto.getPassScore() != null){
            challengeAssignmentEntity.setPassScore(assignParagraphsCreateDto.getPassScore());
            // DB 적용안해도 되나?
        }
        AssignmentParagraph assignmentParagraph = assignParagraphsCreateDto.toAssignmentParagraphs(challengeAssignmentEntity);
        return assignmentParagraphRepository.save(assignmentParagraph);
    }
}
