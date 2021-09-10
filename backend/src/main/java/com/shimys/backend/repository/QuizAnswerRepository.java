package com.shimys.backend.repository;

import com.shimys.backend.domain.assignment.QuizAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizAnswerRepository extends JpaRepository<QuizAnswer, Long> {
}
