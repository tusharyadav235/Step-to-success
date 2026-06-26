package com.steptosuccess.backend.controller;

import com.steptosuccess.backend.model.GalleryImage;
import com.steptosuccess.backend.repository.GalleryImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    @Autowired
    private GalleryImageRepository repository;

    @GetMapping
    public List<GalleryImage> getAllImages() {
        return repository.findAll();
    }

    @PostMapping
    public GalleryImage addImage(@RequestBody GalleryImage image) {
        return repository.save(image);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
