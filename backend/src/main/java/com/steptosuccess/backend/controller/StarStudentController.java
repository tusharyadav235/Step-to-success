package com.steptosuccess.backend.controller;

import com.steptosuccess.backend.model.StarStudent;
import com.steptosuccess.backend.repository.StarStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StarStudentController {

    @Autowired
    private StarStudentRepository repository;

    @GetMapping
    public List<StarStudent> getAllStudents() {
        return repository.findAll();
    }

    @PostMapping
    public StarStudent addStudent(@RequestBody StarStudent student) {
        return repository.save(student);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
