package com.placement.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.placement.backend.entity.Application;
import com.placement.backend.exception.ResourceNotFoundException;
import com.placement.backend.repository.ApplicationRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    private final ApplicationRepository applicationRepository;

    public ApplicationController(
            ApplicationRepository applicationRepository) {

        this.applicationRepository = applicationRepository;
    }

    // CREATE
    @PostMapping
    public Application createApplication(
            @Valid @RequestBody Application application) {

        return applicationRepository.save(application);
    }

    // READ ALL
    @GetMapping
    public List<Application> getAllApplications() {

        return applicationRepository.findAll();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Application getApplicationById(
            @PathVariable Long id) {

        return applicationRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Application not found with id: " + id
                        )
                );
    }

    // UPDATE
    @PutMapping("/{id}")
    public Application updateApplication(
            @PathVariable Long id,
            @Valid @RequestBody Application application) {

        Application existingApplication =
                applicationRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Application not found with id: " + id
                                )
                        );

        existingApplication.setCompany(
                application.getCompany());

        existingApplication.setJobRole(
                application.getJobRole());

        existingApplication.setApplicationDate(
                application.getApplicationDate());

        existingApplication.setStatus(
                application.getStatus());

        existingApplication.setLocation(
                application.getLocation());

        existingApplication.setNotes(
                application.getNotes());

        return applicationRepository.save(
                existingApplication);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteApplication(
            @PathVariable Long id) {

        Application existingApplication =
                applicationRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Application not found with id: " + id
                                )
                        );

        applicationRepository.delete(existingApplication);

        return "Application deleted successfully";
    }
}