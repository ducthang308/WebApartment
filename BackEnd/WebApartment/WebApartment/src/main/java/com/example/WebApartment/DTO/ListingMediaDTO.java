package com.example.WebApartment.DTO;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListingMediaDTO {
    @JsonProperty("listing_id")
    private Long listingId;

    @JsonProperty("type")
    private String type;

    @JsonProperty("url")
    private String url;

    @JsonProperty("thumbnail_url")
    private String thumbnailUrl;

    @JsonProperty("order_index")
    private Integer orderIndex;
}

