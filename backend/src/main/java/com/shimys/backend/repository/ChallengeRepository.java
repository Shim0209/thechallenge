package com.shimys.backend.repository;

import com.shimys.backend.domain.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    @Override
    Optional<Challenge> findById(Long aLong);
}
