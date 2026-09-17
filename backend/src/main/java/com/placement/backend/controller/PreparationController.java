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

import com.placement.backend.entity.Preparation;
import com.placement.backend.exception.ResourceNotFoundException;
import com.placement.backend.repository.PreparationRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/preparations")
@CrossOrigin(origins = "http://localhost:5173")
public class PreparationController {

    private final PreparationRepository preparationRepository;

    public PreparationController(
            PreparationRepository preparationRepository) {

        this.preparationRepository = preparationRepository;
    }

    // CREATE
    @PostMapping
    public Preparation createPreparation(
            @Valid @RequestBody Preparation preparation) {

        return preparationRepository.save(preparation);
    }

    // READ ALL
    @GetMapping
    public List<Preparation> getAllPreparations() {

        return preparationRepository.findAll();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Preparation getPreparationById(
            @PathVariable Long id) {

        return preparationRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Preparation not found with id: " + id
                        )
                );
    }

    // UPDATE
    @PutMapping("/{id}")
    public Preparation updatePreparation(
            @PathVariable Long id,
            @Valid @RequestBody Preparation preparation) {

        Preparation existingPreparation =
                preparationRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Preparation not found with id: " + id
                                )
                        );

        existingPreparation.setTopic(
                preparation.getTopic());

        existingPreparation.setCategory(
                preparation.getCategory());

        existingPreparation.setProgress(
                preparation.getProgress());

        existingPreparation.setStatus(
                preparation.getStatus());

        existingPreparation.setNotes(
                preparation.getNotes());

        return preparationRepository.save(
                existingPreparation);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deletePreparation(
            @PathVariable Long id) {

        Preparation existingPreparation =
                preparationRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Preparation not found with id: " + id
                                )
                        );

        preparationRepository.delete(existingPreparation);

        return "Preparation deleted successfully";
    }
}