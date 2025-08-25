package com.example.WebApartment.Services;

import com.example.WebApartment.DTO.ListingFeatureDTO;
import com.example.WebApartment.Models.Feature;
import com.example.WebApartment.Models.Listing;
import com.example.WebApartment.Models.ListingFeature;
import com.example.WebApartment.Models.ListingFeatureId;
import com.example.WebApartment.Repositories.FeatureRepository;
import com.example.WebApartment.Repositories.ListingFeatureRepository;
import com.example.WebApartment.Repositories.ListingRepository;
import com.example.WebApartment.Services.Implements.IListingFeatureService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ListingFeatureService implements IListingFeatureService {
    private final ListingFeatureRepository listingFeatureRepository;
    private final ListingRepository listingRepository;
    private final FeatureRepository featureRepository;

    @Override
    public ListingFeatureDTO createListingFeature(ListingFeatureDTO dto) {
        Listing listing = listingRepository.findById(dto.getListingId())
                .orElseThrow(() -> new RuntimeException("Listing not found"));
        Feature feature = featureRepository.findById(dto.getFeatureId())
                .orElseThrow(() -> new RuntimeException("Feature not found"));

        ListingFeatureId id = new ListingFeatureId(dto.getListingId(), dto.getFeatureId());

        ListingFeature entity = new ListingFeature();
        entity.setId(id);
        entity.setListing(listing);
        entity.setFeature(feature);

        ListingFeature saved = listingFeatureRepository.save(entity);

        return new ListingFeatureDTO(saved.getId().getListingId(), saved.getId().getFeatureId());
    }

    @Override
    public ListingFeatureDTO getListingFeatureById(ListingFeatureId id) {
        ListingFeature entity = listingFeatureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ListingFeature not found"));

        return new ListingFeatureDTO(entity.getId().getListingId(), entity.getId().getFeatureId());
    }

    @Override
    public List<ListingFeatureDTO> getAllListingFeatures() {
        return listingFeatureRepository.findAll().stream()
                .map(e -> new ListingFeatureDTO(e.getId().getListingId(), e.getId().getFeatureId()))
                .collect(Collectors.toList());
    }

    @Override
    public ListingFeatureDTO updateListingFeature(ListingFeatureId id, ListingFeatureDTO dto) {
        ListingFeature entity = listingFeatureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ListingFeature not found"));

        // Nếu muốn đổi sang listing/feature khác
        if (!id.getListingId().equals(dto.getListingId()) || !id.getFeatureId().equals(dto.getFeatureId())) {
            listingFeatureRepository.deleteById(id);

            return createListingFeature(dto);
        }

        return new ListingFeatureDTO(entity.getId().getListingId(), entity.getId().getFeatureId());
    }

    @Override
    public void deleteListingFeature(ListingFeatureId id) {
        listingFeatureRepository.deleteById(id);
    }
}
