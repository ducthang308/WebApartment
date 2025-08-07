package com.example.WebApartment.Repositories;

import com.example.WebApartment.Models.FavoriteListings;
import com.example.WebApartment.Models.FavoriteListingsKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteListingsRepository extends JpaRepository<FavoriteListings, FavoriteListingsKey> {
    List<FavoriteListings> findByUserId(Long userId);
}
