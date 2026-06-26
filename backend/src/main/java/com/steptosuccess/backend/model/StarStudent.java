package com.steptosuccess.backend.model;

import jakarta.persistence.*;

@Entity
public class StarStudent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String achievementTitle;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String imageUrl;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getAchievementTitle() { return achievementTitle; }
    public void setAchievementTitle(String achievementTitle) { this.achievementTitle = achievementTitle; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
