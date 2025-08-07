package com.example.WebApartment.Controllers;

import com.example.WebApartment.DTO.FavoriteListingsDTO;
import com.example.WebApartment.DTO.FavoriteResponseDTO;
import com.example.WebApartment.Models.FavoriteListings;
import com.example.WebApartment.Models.FavoriteListingsKey;
import com.example.WebApartment.Services.FavoriteListingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/favoriteListing")
@RequiredArgsConstructor
public class FavoriteListingsController {
    private final FavoriteListingsService favoriteListingsService;

    @PostMapping("")
    public ResponseEntity<FavoriteResponseDTO> createFavorite(@RequestBody FavoriteListingsDTO dto) {
        return ResponseEntity.ok(favoriteListingsService.createFavorite(dto));
    }

    @GetMapping("")
    public ResponseEntity<List<FavoriteResponseDTO>> getAllFavorites() {
        return ResponseEntity.ok(favoriteListingsService.getAllFavorites());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FavoriteResponseDTO>> getFavoritesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(favoriteListingsService.getFavoritesByUser(userId));
    }

    @PutMapping("")
    public ResponseEntity<FavoriteResponseDTO> updateFavorite(
            @RequestParam Long userId,
            @RequestParam Long listingId,
            @RequestBody FavoriteListingsDTO dto) {
        FavoriteListingsKey key = new FavoriteListingsKey(userId, listingId);
        return ResponseEntity.ok(favoriteListingsService.updateFavorite(key, dto));
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteFavorite(
            @RequestParam Long userId,
            @RequestParam Long listingId) {
        FavoriteListingsKey key = new FavoriteListingsKey(userId, listingId);
        favoriteListingsService.deleteFavorite(key);
        return ResponseEntity.ok("Deleted successfully");
    }

}
