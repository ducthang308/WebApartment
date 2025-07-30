package com.example.WebApartment.DTO;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleDTO {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("role_name")
    private String roleName;
}

