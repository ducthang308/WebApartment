package com.example.WebApartment.Services;

import com.example.WebApartment.DTO.ListingDTO;
import com.example.WebApartment.DTO.ListingMediaDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.*;
import com.example.WebApartment.Repositories.*;
import com.example.WebApartment.Services.Implements.IListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ListingService implements IListingService {

    private final CategoryRepository categoryRepository;
    private final ListingRepository listingRepository;
    private final ListingMediaRepository listingMediaRepository;
    private final StreetRepository streetRepository;
    private final UserRepository userRepository;

    @Override
    public Listing createListing(ListingDTO listingDTO) throws Exception {
        Long categoryId = listingDTO.getCategoryId();
        Long streetId = listingDTO.getStreetId();
        Long userId = listingDTO.getUsersId();

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find category with id: " + categoryId));

        Street street = streetRepository.findById(streetId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find ward with id: " + streetId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: " + userId));

        Listing listing = Listing.builder()
                .fullAddress(listingDTO.getFullAddress())
                .price(listingDTO.getPrice())
                .areaM2(listingDTO.getAreaM2())
                .title(listingDTO.getTitle())
                .postedDate(listingDTO.getPostedDate())
                .status(listingDTO.getStatus())
                .contact(listingDTO.getContact())
                .formOfPayment(listingDTO.getFormOfPayment())
                .category(category)

                .user(user)
                .build();
        return listingRepository.save(listing);
    }


    @Override
    public Listing getListingById(Long listingId) throws Exception {
        Optional<Listing> optionalListing = listingRepository.getDetailListing(listingId);
        if(optionalListing.isPresent()){
            return optionalListing.get();
        }
        throw new DataNotFoundException("Cannot find listing with ID: "+listingId);
    }

    @Override
    public List<ListingDTO> getAllListings(String keyword, Long categoryId) {
        List<Listing> listings = listingRepository.searchListing(categoryId, keyword);

        return listings.stream().map(listing -> ListingDTO.builder()
                        .usersId(listing.getUser() != null ? listing.getUser().getId() : null)
                        .categoryId(listing.getCategory() != null ? listing.getCategory().getId() : null)
                        .fullAddress(listing.getFullAddress())
                        .price(listing.getPrice())
                        .areaM2(listing.getAreaM2())
                        .title(listing.getTitle())
                        .description(listing.getDescription())
                        .postedDate(listing.getPostedDate())
                        .status(listing.getStatus())
                        .contact(listing.getContact())
                        .formOfPayment(listing.getFormOfPayment())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public Listing updateListing(Long listingId, ListingDTO listingDTO) throws Exception {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new Exception("Listing with ID " + listingId + " not found"));

        listing.setFullAddress(listingDTO.getFullAddress());
        listing.setPrice(listingDTO.getPrice());
        listing.setAreaM2(listingDTO.getAreaM2());
        listing.setTitle(listingDTO.getTitle());
        listing.setDescription(listingDTO.getDescription());
        listing.setPostedDate(listingDTO.getPostedDate());
        listing.setStatus(listingDTO.getStatus());
        listing.setContact(listingDTO.getContact());
        listing.setFormOfPayment(listingDTO.getFormOfPayment());

        if (listingDTO.getUsersId() != null) {
            User user = userRepository.findById(listingDTO.getUsersId())
                    .orElseThrow(() -> new Exception("User not found with ID: " + listingDTO.getUsersId()));
            listing.setUser(user);
        }

        if (listingDTO.getStreetId() != null) {
            Street street = streetRepository.findById(listingDTO.getStreetId())
                    .orElseThrow(() -> new Exception("Ward not found with ID: " + listingDTO.getStreetId()));
            listing.setStreet(street);
        }


        if (listingDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(listingDTO.getCategoryId())
                    .orElseThrow(() -> new Exception("Category not found with ID: " + listingDTO.getCategoryId()));
            listing.setCategory(category);
        }

        return listingRepository.save(listing);
    }


    @Override
    public void deleteListing(Long id) {
        listingRepository.deleteById(id);
    }

    @Override
    public ListingMedia createListingMedia(Long listingId, ListingMediaDTO listingMediaDTO) throws Exception {
        Listing existingListing = listingRepository.findById(listingId)
                .orElseThrow(()->
                        new DataNotFoundException("Cannot find product with id: "+listingMediaDTO.getListingId()));
        ListingMedia newListingMedia = ListingMedia.builder()
                .listing(existingListing)
                .type(listingMediaDTO.getType())
                .url(listingMediaDTO.getUrl())
                .thumbnailUrl(listingMediaDTO.getThumbnailUrl())
                .orderIndex(listingMediaDTO.getOrderIndex())
                .build();
        int size = listingMediaRepository.findByListingId(listingId).size();
        if(size >= ListingMedia.MAXIMUM_IMAGES_PER_PRODUCT){
            throw new DataNotFoundException("Numbers of images must be <= "+ ListingMedia.MAXIMUM_IMAGES_PER_PRODUCT);
        }
        return listingMediaRepository.save(newListingMedia);
    }

    @Override
    public List<Listing> findListingsByIds(List<Long> listingIds) {
        return listingRepository.findListingsByIds(listingIds);
    }

    @Override
    public int countImagesByListingId(Long listingId) {
        return listingMediaRepository.countByListingId(listingId);
    }
}
