package com.example.WebApartment.Controllers;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.WebApartment.DTO.ListingDTO;
import com.example.WebApartment.DTO.ListingMediaDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.Listing;
import com.example.WebApartment.Models.ListingMedia;
import com.example.WebApartment.Services.Implements.IListingService;
import com.example.WebApartment.Services.ListingService;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${api.prefix}/listing")
@RequiredArgsConstructor
@Slf4j
public class ListingController {

    private final IListingService listingService;
    private final Cloudinary cloudinary;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Listing> createListing(@RequestBody @Valid ListingDTO listingDTO) {
        try {
            Listing createdListing = listingService.createListing(listingDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdListing);
        } catch (DataNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ListingDTO>> getAllListings(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0", name = "category_id") Long categoryId
    ) {
        List<ListingDTO> listings = listingService.getAllListings(keyword, categoryId);
        return ResponseEntity.ok(listings);
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllListingById(@PathVariable("id") Long listingId)
    {
        try {
            Listing existingId = listingService.getListingById(listingId);
            return ResponseEntity.ok(existingId);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateListing(@PathVariable("id") Long id,
                                           @Valid @RequestBody ListingDTO listingDTO)
    {
        try {
            listingService.updateListing(id, listingDTO);
            return ResponseEntity.ok("Update successfully");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteListing(@PathVariable("id") Long id)
    {
        try {
            listingService.deleteListing(id);
            return ResponseEntity.ok("Delete successfully");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/by-ids")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getListingByIds(@RequestParam("ids") String ids){
        try{
            List<Long> listingIds = Arrays.stream(ids.split(","))
                    .map(Long::parseLong)
                    .collect(Collectors.toList());
            List<Listing> listings = listingService.findListingsByIds(listingIds);
            return ResponseEntity.ok(listings);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(value = "uploads/{id}", consumes = "multipart/form-data")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> uploadImages(@RequestParam("files") List<MultipartFile> files,
                                          @PathVariable("id") Long listingId) {
        log.info("Listing ID: {}", listingId);
        log.info("Number of files received: {}", files != null ? files.size() : 0);

        if (files == null || files.isEmpty()) {
            return ResponseEntity.badRequest().body("No files provided for upload.");
        }

        try {
            Listing existingListing = listingService.getListingById(listingId);
            int currentImageCount = listingService.countImagesByListingId(listingId);

            if (currentImageCount >= ListingMedia.MAXIMUM_IMAGES_PER_PRODUCT) {
                return ResponseEntity.badRequest().body("Maximum number of images (10) reached for this listing.");
            }

            int orderIndex = currentImageCount;
            List<ListingMediaDTO> responseDTOs = new ArrayList<>();

            for (MultipartFile file : files) {
                if (file.isEmpty()) continue;
                if (orderIndex >= ListingMedia.MAXIMUM_IMAGES_PER_PRODUCT) break;

                Map<String, Object> options = ObjectUtils.asMap(
                        "resource_type", "auto"
                );

                Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), options);

                String fileType = file.getContentType(); // image/jpeg, video/mp4,...
                String url = uploadResult.get("url").toString();

                String thumbnailUrl = null;
                if (fileType != null && fileType.startsWith("video")) {
                    // Tạo thumbnail cho video
                    thumbnailUrl = url.replace("/upload/", "/upload/so_2,w_300,h_200,c_fill/");
                } else {
                    // Tạo thumbnail cho ảnh
                    thumbnailUrl = url.replace("/upload/", "/upload/w_200,h_200,c_thumb/");
                }


                ListingMediaDTO mediaDTO = ListingMediaDTO.builder()
                        .listingId(existingListing.getId())
                        .url(url)
                        .type(file.getContentType())
                        .thumbnailUrl(thumbnailUrl)
                        .orderIndex(orderIndex++)
                        .build();

                listingService.createListingMedia(existingListing.getId(), mediaDTO);
                responseDTOs.add(mediaDTO);
            }

            return ResponseEntity.ok(responseDTOs);
        } catch (IOException e) {
            log.error("File processing error", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file format.");
        } catch (Exception e) {
            log.error("Unexpected error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred.");
        }
    }



    private boolean isImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }
}
