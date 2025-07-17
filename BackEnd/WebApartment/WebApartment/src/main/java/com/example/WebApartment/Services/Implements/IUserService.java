package com.example.WebApartment.Services.Implements;

import com.example.WebApartment.DTO.UserDTO;
import com.example.WebApartment.Models.User;
import com.example.WebApartment.Responses.LoginResponse;

import java.util.List;

public interface IUserService {
    User createUser(UserDTO userDTO) throws Exception;
    LoginResponse login(String phone, String password) throws Exception;
    //    User updatePass(UpdatePassDTO updatePassDTO, Long id) throws Exception;
    User updateActive(LoginResponse loginResponse, Long id) throws Exception;
    List<User> getAllUsers();
    User getUserById(Long id);
    User findUserByPhoneNumber(String phone);
}
