package com.example.WebApartment.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data //toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdatePassDTO {
    @JsonProperty("password")
    @NotBlank(message = "Password cannot be blank")
    private String password;

    @JsonProperty("retype_pass")
    private String retypePass;

    @JsonProperty("new_pass")
    private String newPass;
}