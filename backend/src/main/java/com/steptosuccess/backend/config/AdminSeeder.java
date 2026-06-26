package com.steptosuccess.backend.config;

import com.steptosuccess.backend.model.AdminUser;
import com.steptosuccess.backend.repository.AdminUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminSeeder {

    @Bean
    public CommandLineRunner seedDatabase(AdminUserRepository repository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (repository.findByUsername("admin").isEmpty()) {
                AdminUser admin = new AdminUser();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                repository.save(admin);
                System.out.println("Default admin user created: admin / admin123");
            }
        };
    }
}
