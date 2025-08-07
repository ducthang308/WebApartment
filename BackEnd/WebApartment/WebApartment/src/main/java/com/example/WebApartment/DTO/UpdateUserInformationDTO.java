package com.example.WebApartment.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateUserInformationDTO {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("phone_number")
    private String phone;

    @JsonProperty("address")
    private String address;

    @JsonProperty("profile_image")
    private String profileImage;

    @JsonProperty("status")
    private Boolean status;

    @JsonProperty("role_name")
    private String roleName;

    @JsonProperty("facebook_account")
    private int facebookAccountId;

    @JsonProperty("google_account")
    private int googleAccountId;
}
