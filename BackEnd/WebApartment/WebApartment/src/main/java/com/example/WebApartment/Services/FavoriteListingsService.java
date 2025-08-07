package com.example.WebApartment.Services;

import com.example.WebApartment.DTO.FavoriteListingsDTO;
import com.example.WebApartment.DTO.FavoriteResponseDTO;
import com.example.WebApartment.Models.FavoriteListings;
import com.example.WebApartment.Models.FavoriteListingsKey;
import com.example.WebApartment.Models.Listing;
import com.example.WebApartment.Models.User;
import com.example.WebApartment.Repositories.FavoriteListingsRepository;
import com.example.WebApartment.Repositories.ListingRepository;
import com.example.WebApartment.Repositories.UserRepository;
import com.example.WebApartment.Services.Implements.IFavoriteListingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteListingsService implements IFavoriteListingsService {
    private final FavoriteListingsRepository favoriteListingsRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;

    @Override
    public FavoriteResponseDTO createFavorite(FavoriteListingsDTO dto) {
        User user = userRepository.findById(dto.getUsersId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Listing listing = listingRepository.findById(dto.getListingId())
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        Date createdAt;
        try {
            createdAt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(dto.getCreatedAt());
        } catch (Exception e) {
            createdAt = new Date();
        }

        FavoriteListingsKey key = new FavoriteListingsKey(dto.getUsersId(), dto.getListingId());
        FavoriteListings favorite = FavoriteListings.builder()
                .id(key)
                .user(user)
                .listing(listing)
                .createdAt(createdAt)
                .build();

        favoriteListingsRepository.save(favorite);
        return mapToResponseDTO(favorite);
    }

    @Override
    public FavoriteResponseDTO updateFavorite(FavoriteListingsKey key, FavoriteListingsDTO dto) {
        FavoriteListings favorite = favoriteListingsRepository.findById(key)
                .orElseThrow(() -> new RuntimeException("Favorite not found"));

        if (dto.getCreatedAt() != null) {
            try {
                Date createdAt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(dto.getCreatedAt());
                favorite.setCreatedAt(createdAt);
            } catch (Exception e) {
                favorite.setCreatedAt(new Date());
            }
        }

        favoriteListingsRepository.save(favorite);
        return mapToResponseDTO(favorite);
    }

    @Override
    public List<FavoriteResponseDTO> getAllFavorites() {
        return favoriteListingsRepository.findAll()
                .stream().map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<FavoriteResponseDTO> getFavoritesByUser(Long userId) {
        return favoriteListingsRepository.findByUserId(userId)
                .stream().map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteFavorite(FavoriteListingsKey key) {
        if (!favoriteListingsRepository.existsById(key)) {
            throw new RuntimeException("Favorite not found");
        }
        favoriteListingsRepository.deleteById(key);
    }

    private FavoriteResponseDTO mapToResponseDTO(FavoriteListings favorite) {
        return FavoriteResponseDTO.builder()
                .usersId(favorite.getUser().getId())
                .listingId(favorite.getListing().getId())
                .listingTitle(favorite.getListing().getTitle())
                .listingAddress(favorite.getListing().getFullAddress())
                .listingPrice(favorite.getListing().getPrice())
                .createdAt(favorite.getCreatedAt())
                .build();
    }
}
