package com.shimys.backend.repository;

import com.shimys.backend.domain.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    @Override
    Optional<Challenge> findById(Long aLong);

    @Query(value = "SELECT * FROM challenge WHERE hostId = :hostId", nativeQuery = true)
    List<Challenge> findChallengesByHost(@Param("hostId") Long hostId);

    @Modifying
    @Query(value = "UPDATE challenge SET title = :title, image = :image WHERE id = :challengeId", nativeQuery = true)
    int updateChallengeTitleAndImageById(@Param("challengeId") Long challengeId, @Param("title") String title, @Param("image")String image);

    @Modifying
    @Query(value = "DELETE FROM challengeTag WHERE challengeId = :challengeId", nativeQuery = true)
    int deleteChallengeTagById(@Param("challengeId") Long challengeId);
}
