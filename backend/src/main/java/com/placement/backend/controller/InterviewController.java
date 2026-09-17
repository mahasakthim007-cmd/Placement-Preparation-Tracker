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

import com.placement.backend.entity.Interview;
import com.placement.backend.exception.ResourceNotFoundException;
import com.placement.backend.repository.InterviewRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin(origins = "http://localhost:5173")
public class InterviewController {

    private final InterviewRepository interviewRepository;

    public InterviewController(
            InterviewRepository interviewRepository) {

        this.interviewRepository = interviewRepository;
    }

    // CREATE
    @PostMapping
    public Interview createInterview(
            @Valid @RequestBody Interview interview) {

        return interviewRepository.save(interview);
    }

    // READ ALL
    @GetMapping
    public List<Interview> getAllInterviews() {

        return interviewRepository.findAll();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Interview getInterviewById(
            @PathVariable Long id) {

        return interviewRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Interview not found with id: " + id
                        )
                );
    }

    // UPDATE
    @PutMapping("/{id}")
    public Interview updateInterview(
            @PathVariable Long id,
            @Valid @RequestBody Interview interview) {

        Interview existingInterview =
                interviewRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Interview not found with id: " + id
                                )
                        );

        existingInterview.setCompany(
                interview.getCompany());

        existingInterview.setRoundName(
                interview.getRoundName());

        existingInterview.setInterviewDate(
                interview.getInterviewDate());

        existingInterview.setResult(
                interview.getResult());

        existingInterview.setFeedback(
                interview.getFeedback());

        return interviewRepository.save(
                existingInterview);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteInterview(
            @PathVariable Long id) {

        Interview existingInterview =
                interviewRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Interview not found with id: " + id
                                )
                        );

        interviewRepository.delete(existingInterview);

        return "Interview deleted successfully";
    }
}