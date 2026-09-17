package com.placement.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.placement.backend.entity.Interview;

public interface InterviewRepository
        extends JpaRepository<Interview, Long> {
}