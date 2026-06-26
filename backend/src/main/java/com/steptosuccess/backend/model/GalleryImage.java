package com.steptosuccess.backend.model;

import jakarta.persistence.*;

@Entity
public class GalleryImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String imageUrl;
    
    private String altText;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public String getAltText() { return altText; }
    public void setAltText(String altText) { this.altText = altText; }
}
