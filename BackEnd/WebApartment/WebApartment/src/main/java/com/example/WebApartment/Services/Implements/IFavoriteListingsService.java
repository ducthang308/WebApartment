package com.example.WebApartment.Services.Implements;

import com.example.WebApartment.DTO.FavoriteListingsDTO;
import com.example.WebApartment.DTO.FavoriteResponseDTO;
import com.example.WebApartment.Models.FavoriteListings;
import com.example.WebApartment.Models.FavoriteListingsKey;

import java.util.List;

public interface IFavoriteListingsService {
    FavoriteResponseDTO createFavorite(FavoriteListingsDTO dto);
    FavoriteResponseDTO updateFavorite(FavoriteListingsKey key, FavoriteListingsDTO dto);
    List<FavoriteResponseDTO> getAllFavorites();
    List<FavoriteResponseDTO> getFavoritesByUser(Long userId);
    void deleteFavorite(FavoriteListingsKey key);
}