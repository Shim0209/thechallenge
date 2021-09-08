package com.shimys.backend.repository;

import com.shimys.backend.domain.challenge.ChallengeParagraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeParagraphsRepository extends JpaRepository<ChallengeParagraph, Long> {
}
