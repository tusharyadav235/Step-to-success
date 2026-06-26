package com.steptosuccess.backend.controller;

import com.steptosuccess.backend.model.ContactApplication;
import com.steptosuccess.backend.repository.ContactApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ContactApplicationRepository repository;

    @GetMapping
    public List<ContactApplication> getAllApplications() {
        return repository.findAllByOrderBySubmittedAtDesc();
    }

    @PostMapping
    public ContactApplication submitApplication(@RequestBody ContactApplication application) {
        return repository.save(application);
    }
}
