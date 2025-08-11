package com.example.WebApartment.Repositories;

import com.example.WebApartment.DTO.UserDTO;
import com.example.WebApartment.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByPhone(String phone);
    Optional<User> findByPhone(String phone);
}
