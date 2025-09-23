package com.example.WebApartment.Controllers;

import com.example.WebApartment.DTO.ListingFeatureDTO;
import com.example.WebApartment.Models.ListingFeatureId;
import com.example.WebApartment.Services.ListingFeatureService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/listingFeature")
@RequiredArgsConstructor
public class ListingFeatureController {
    private final ListingFeatureService listingFeatureService;

    @PostMapping
    public ResponseEntity<ListingFeatureDTO> create(@RequestBody ListingFeatureDTO dto) {
        return ResponseEntity.ok(listingFeatureService.createListingFeature(dto));
    }

    @GetMapping("/{listingId}/{featureId}")
    public ResponseEntity<ListingFeatureDTO> getById(@PathVariable Long listingId, @PathVariable Long featureId) {
        ListingFeatureId id = new ListingFeatureId(listingId, featureId);
        return ResponseEntity.ok(listingFeatureService.getListingFeatureById(id));
    }

    @GetMapping
    public ResponseEntity<List<ListingFeatureDTO>> getAll() {
        return ResponseEntity.ok(listingFeatureService.getAllListingFeatures());
    }

    @PutMapping("/{listingId}/{featureId}")
    public ResponseEntity<ListingFeatureDTO> update(
            @PathVariable Long listingId,
            @PathVariable Long featureId,
            @RequestBody ListingFeatureDTO dto) {
        ListingFeatureId id = new ListingFeatureId(listingId, featureId);
        return ResponseEntity.ok(listingFeatureService.updateListingFeature(id, dto));
    }

    @DeleteMapping("/{listingId}/{featureId}")
    public ResponseEntity<Void> delete(@PathVariable Long listingId, @PathVariable Long featureId) {
        ListingFeatureId id = new ListingFeatureId(listingId, featureId);
        listingFeatureService.deleteListingFeature(id);
        return ResponseEntity.noContent().build();
    }
}
