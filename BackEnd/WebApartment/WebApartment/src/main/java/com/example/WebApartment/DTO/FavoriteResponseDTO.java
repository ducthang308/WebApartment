package com.example.WebApartment.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Date;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoriteResponseDTO {
    @JsonProperty("users_id")
    private Long usersId;

    @JsonProperty("listing_id")
    private Long listingId;

    @JsonProperty("listing_title")
    private String listingTitle;

    @JsonProperty("listing_address")
    private String listingAddress;

    @JsonProperty("listing_price")
    private Double listingPrice;

    @JsonProperty("created_at")
    private Date createdAt;
}
