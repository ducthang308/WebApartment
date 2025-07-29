package com.example.WebApartment.Responses;

import com.example.WebApartment.Models.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponse {
    private Long id;

    private String token;

    @JsonProperty("roles_id")
    private Long rolesId;

    @JsonProperty("phone_number")
    private String phoneNumber;

    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("address")
    private String address;

    @JsonProperty("status")
    private Boolean status;

    public static LoginResponse fromUser(User user){
        LoginResponse loginResponse = LoginResponse.builder()
                .id(user.getId())
                .rolesId(user.getRoles().getId())
                .phoneNumber(user.getPhone())
                .fullName(user.getFullName())
                .address(user.getAddress())
                .status(user.getStatus())
                .build();
        return loginResponse;
    }
}