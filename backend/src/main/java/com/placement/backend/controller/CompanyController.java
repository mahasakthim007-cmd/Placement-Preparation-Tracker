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

import com.placement.backend.entity.Company;
import com.placement.backend.exception.ResourceNotFoundException;
import com.placement.backend.repository.CompanyRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyController {

    private final CompanyRepository companyRepository;

    public CompanyController(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    // CREATE
    @PostMapping
    public Company createCompany(
            @Valid @RequestBody Company company) {

        return companyRepository.save(company);
    }

    // READ ALL
    @GetMapping
    public List<Company> getAllCompanies() {

        return companyRepository.findAll();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Company getCompanyById(
            @PathVariable Long id) {

        return companyRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Company not found with id: " + id
                        )
                );
    }

    // UPDATE
    @PutMapping("/{id}")
    public Company updateCompany(
            @PathVariable Long id,
            @Valid @RequestBody Company company) {

        Company existingCompany =
                companyRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Company not found with id: " + id
                                )
                        );

        existingCompany.setCompanyName(
                company.getCompanyName());

        existingCompany.setIndustry(
                company.getIndustry());

        existingCompany.setLocation(
                company.getLocation());

        existingCompany.setWebsite(
                company.getWebsite());

        return companyRepository.save(existingCompany);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteCompany(
            @PathVariable Long id) {

        Company existingCompany =
                companyRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Company not found with id: " + id
                                )
                        );

        companyRepository.delete(existingCompany);

        return "Company deleted successfully";
    }
}