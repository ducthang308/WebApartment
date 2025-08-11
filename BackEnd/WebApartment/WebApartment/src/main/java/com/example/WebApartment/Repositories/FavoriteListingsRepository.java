package com.example.WebApartment.Repositories;

import com.example.WebApartment.Models.FavoriteListings;
import com.example.WebApartment.Models.FavoriteListingsKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteListingsRepository extends JpaRepository<FavoriteListings, FavoriteListingsKey> {
    List<FavoriteListings> findByUserId(Long userId);
}
