package com.shimys.backend.repository;

import com.shimys.backend.domain.challenge.ChallengeAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengeAssignmentRepository extends JpaRepository<ChallengeAssignment, Long> {
}
