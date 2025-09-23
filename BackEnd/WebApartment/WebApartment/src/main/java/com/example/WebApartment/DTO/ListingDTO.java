package com.example.WebApartment.DTO;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

import java.util.Date;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListingDTO {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("users_id")
    private Long usersId;

    @JsonProperty("category_id")
    private Long categoryId;

    @JsonProperty("full_address")
    private String fullAddress;

    @JsonProperty("price")
    private Double price;

    @JsonProperty("area_m2")
    private Double areaM2;

    @JsonProperty("title")
    private String title;

    @JsonProperty("description")
    private String description;

    @JsonProperty("posted_date")
    private Date postedDate;

    @JsonProperty("status")
    private String status;

    @JsonProperty("contact")
    private String contact;

    @JsonProperty("form_of_payment")
    private String formOfPayment;
}

