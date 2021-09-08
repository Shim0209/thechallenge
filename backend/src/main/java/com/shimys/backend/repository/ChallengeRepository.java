package com.shimys.backend.repository;

import com.shimys.backend.domain.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    @Override
    Optional<Challenge> findById(Long aLong);

    @Query(value = "SELECT * FROM challenge WHERE hostId = :hostId", nativeQuery = true)
    List<Challenge> findChallengesByHost(@Param("hostId") Long hostId);
}
