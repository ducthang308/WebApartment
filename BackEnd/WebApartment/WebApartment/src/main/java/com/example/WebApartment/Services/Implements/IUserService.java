package com.example.WebApartment.Services.Implements;

import com.example.WebApartment.DTO.UpdatePassDTO;
import com.example.WebApartment.DTO.UpdateUserInformationDTO;
import com.example.WebApartment.DTO.UserDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.User;
import com.example.WebApartment.Responses.UserResponse;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    User createUser(UserDTO userDTO) throws Exception;
    UserResponse login(String phone, String password) throws Exception;
    User updatePass(UpdatePassDTO updatePassDTO, Long id) throws Exception;
    User updateActive(UserResponse userResponse, Long id) throws Exception;
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    Optional<User> findUserByPhone(String phone);
    UpdateUserInformationDTO updateUserInformation(Long id, UserDTO dto) throws DataNotFoundException;
}
