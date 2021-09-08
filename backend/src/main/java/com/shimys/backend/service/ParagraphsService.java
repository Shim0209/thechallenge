package com.shimys.backend.service;

import com.shimys.backend.domain.Challenge;
import com.shimys.backend.domain.challenge.ChallengeParagraph;
import com.shimys.backend.repository.ChallengeParagraphsRepository;
import com.shimys.backend.repository.ChallengeRepository;
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

    public ChallengeParagraph 단락생성(ParagraphsCreateDto paragraphsCreateDto){
        Challenge challengeEntity = challengeRepository.findById(paragraphsCreateDto.getChallengeId()).get();
        ChallengeParagraph challengeParagraph = paragraphsCreateDto.toParagraphsEntity(challengeEntity);
        return challengeParagraphsRepository.save(challengeParagraph);
    }
}
