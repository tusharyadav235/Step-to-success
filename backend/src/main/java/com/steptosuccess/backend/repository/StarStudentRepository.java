package com.steptosuccess.backend.repository;

import com.steptosuccess.backend.model.StarStudent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StarStudentRepository extends JpaRepository<StarStudent, Long> {
}
