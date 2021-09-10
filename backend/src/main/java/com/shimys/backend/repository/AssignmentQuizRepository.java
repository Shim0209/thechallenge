package com.shimys.backend.repository;

import com.shimys.backend.domain.assignment.AssignmentQuiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentQuizRepository extends JpaRepository<AssignmentQuiz, Long> {
}
