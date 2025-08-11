package com.example.WebApartment.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("phone_number")
    private String phone;

    @JsonProperty("address")
    private String address;

    @JsonProperty("password")
    @NotBlank(message = "Password cannot be blank")
    private String password;

    @JsonProperty("profile_image")
    private String profileImage;

    @JsonProperty("retype_pass")
    private String retypePass;

    @JsonProperty("new_pass")
    private String newPass;

    @JsonProperty("status")
    private Boolean status;

    @JsonProperty("roles_id")
    private Long rolesId;

    @JsonProperty("facebook_account")
    private int facebookAccountId;

    @JsonProperty("google_account")
    private int googleAccountId;
}
