package com.steptosuccess.backend.repository;

import com.steptosuccess.backend.model.ContactApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContactApplicationRepository extends JpaRepository<ContactApplication, Long> {
    List<ContactApplication> findAllByOrderBySubmittedAtDesc();
}
