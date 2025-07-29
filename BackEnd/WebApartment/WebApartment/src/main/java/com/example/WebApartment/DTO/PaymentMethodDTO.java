package com.example.WebApartment.DTO;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentMethodDTO {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("name_method")
    private String nameMethod;

    @JsonProperty("payment_description")
    private String paymentDescription;
}

