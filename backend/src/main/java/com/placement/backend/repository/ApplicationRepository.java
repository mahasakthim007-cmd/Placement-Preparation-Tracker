package com.placement.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.placement.backend.entity.Application;

public interface ApplicationRepository
        extends JpaRepository<Application, Long> {
}