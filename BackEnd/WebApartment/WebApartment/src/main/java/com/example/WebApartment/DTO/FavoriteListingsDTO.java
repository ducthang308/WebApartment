    package com.example.WebApartment.DTO;

    import com.fasterxml.jackson.annotation.*;
    import lombok.*;

    @Data
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public class FavoriteListingsDTO {
        @JsonProperty("users_id")
        private Long usersId;

        @JsonProperty("listing_id")
        private Long listingId;

        @JsonProperty("created_at")
        private String createdAt;
    }

