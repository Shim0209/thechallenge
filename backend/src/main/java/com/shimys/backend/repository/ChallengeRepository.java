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

    // --- 챌린지 관련
    // Challenge페이지 모집중인 챌린지 조회 => 한번에 20개씩 잘라서
    // SELECT * FROM challenge WHERE status = '대기' ORDER BY createDate DESC;
        // 내일 시작인 챌린지 조회 => 조회옵션(키워드, 태그, 타이틀), 정렬옵션(생성순, 참여자순)

        // 참여인원수로 정렬
        // 가장 최근에 만들어진 순으로 정렬

    // 태그로 검색

    // 타이틀로 검색

    // 내가 참여중인 챌린지 조회

    // --- Nav 관련
    // 참여중인 챌린지 카운트, 오늘 과제 카운트, 운영중인 챌린지 카운트 한번에 조회

    // 나의 만다아트 전부 조회
}
