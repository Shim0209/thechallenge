package com.shimys.backend.repository;

import com.shimys.backend.domain.challenge.ChallengeTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeTagRepository extends JpaRepository<ChallengeTag, Long> {
}
