package com.example.WebApartment.DTO;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDTO {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("category_name")
    private String categoryName;
}

