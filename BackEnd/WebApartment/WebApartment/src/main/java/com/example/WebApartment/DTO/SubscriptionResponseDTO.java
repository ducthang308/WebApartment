package com.example.WebApartment.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubscriptionResponseDTO {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("users_id")
    private Long usersId;

    @JsonProperty("payment_id")
    private Long paymentId;

    @JsonProperty("payment_name")
    private String paymentName;

    @JsonProperty("amount")
    private Double amount;

    @JsonProperty("status")
    private String status;

    @JsonProperty("start_date")
    private String startDate;

    @JsonProperty("end_date")
    private String endDate;

    @JsonProperty("created_at")
    private String createdAt;
}