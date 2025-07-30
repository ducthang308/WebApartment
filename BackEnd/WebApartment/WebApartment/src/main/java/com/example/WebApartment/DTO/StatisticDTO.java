package com.example.WebApartment.DTO;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatisticDTO {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("total_users")
    private Integer totalUsers;

    @JsonProperty("total_listing")
    private Integer totalListing;

    @JsonProperty("monthly_visits")
    private Integer monthlyVisits;
}
