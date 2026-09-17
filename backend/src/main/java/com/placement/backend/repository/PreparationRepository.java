package com.placement.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.placement.backend.entity.Preparation;

public interface PreparationRepository
        extends JpaRepository<Preparation, Long> {
}