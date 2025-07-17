package com.example.WebApartment.Services;

import com.example.WebApartment.DTO.UserDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Exceptions.PermissonDenyException;
import com.example.WebApartment.JWT.JwtToken;
import com.example.WebApartment.Models.Role;
import com.example.WebApartment.Models.User;
import com.example.WebApartment.Repositories.RoleRepository;
import com.example.WebApartment.Repositories.UserRepository;
import com.example.WebApartment.Responses.LoginResponse;
import com.example.WebApartment.Services.Implements.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtToken jwtToken;
    private final AuthenticationManager authenticationManager;

    @Override
    public User createUser(UserDTO userDTO) throws Exception {
        String phone = userDTO.getPhone();
        if(userRepository.existsByPhone(phone)){
            throw new DataIntegrityViolationException("Phone number already exists");
        }
        Role role = roleRepository.findById(userDTO.getRolesId())
                .orElseThrow(()->new DataNotFoundException("Role not found"));
//        if(role.getName().toUpperCase().equals(Role.ADMIN)){
//            throw new PermissonDenyException("You cannot register an ADMIN account");
//        }
        //Convert từ userDTO => user
        User newUser = User.builder()
                .fullName(userDTO.getFullName())
                .phone(userDTO.getPhone())
                .password(userDTO.getPassword())
                .address(userDTO.getAddress())
                .facebookAccountId(userDTO.getFacebookAccountId())
                .googleAccountId(userDTO.getGoogleAccountId())
                .build();
        newUser.setRoles(role);
        if(userDTO.getFacebookAccountId() == 0 && userDTO.getGoogleAccountId() == 0){
            String password = userDTO.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            newUser.setPassword(encodedPassword);
        }
        return userRepository.save(newUser);
    }

    @Override
    public LoginResponse login(String phone, String password) throws Exception {
        Optional<User> users = userRepository.findByPhone(phone);
        if (users.isEmpty()) {
            throw new DataNotFoundException("Invalid phone number or password");
        }

        User existingUser = users.get();

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                phone, password, existingUser.getAuthorities()
        );
        // Authenticate with Spring Security
        authenticationManager.authenticate(authenticationToken);

        // Generate token and create response DTO with roleId
        Long id = existingUser.getId();
        String token = jwtToken.generationToken(existingUser);
        Long roleId = existingUser.getRoles().getId();
        phone = existingUser.getPhone();
        String name = existingUser.getFullName();
        String address = existingUser.getAddress();
        Boolean status = existingUser.getStatus();

        if (!status){
            throw new BadCredentialsException("Account is banned!");
        }
        else {
            return new LoginResponse(id, token, roleId, phone, name, address, status);
        }
    }

    @Override
    public User updateActive(LoginResponse loginResponse, Long id) throws Exception {
        return null;
    }

    @Override
    public List<User> getAllUsers() {
        return List.of();
    }

    @Override
    public User getUserById(Long id) {
        return null;
    }

    @Override
    public User findUserByPhoneNumber(String phone) {
        return null;
    }
}
