package com.example.WebApartment.Services;

import com.example.WebApartment.DTO.UpdatePassDTO;
import com.example.WebApartment.DTO.UpdateUserInformationDTO;
import com.example.WebApartment.DTO.UserDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.JWT.JwtToken;
import com.example.WebApartment.Models.Role;
import com.example.WebApartment.Models.User;
import com.example.WebApartment.Repositories.RoleRepository;
import com.example.WebApartment.Repositories.UserRepository;
import com.example.WebApartment.Responses.UserResponse;
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
        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        } else {
            newUser.setPassword(null); // hoặc random chuỗi mã hóa nếu cần
        }
//        userDTO.getFacebookAccountId() == 0 && userDTO.getGoogleAccountId() == 0
            if((userDTO.getFacebookAccountId() == null || userDTO.getFacebookAccountId().equals("0"))
                    && (userDTO.getGoogleAccountId() == null || userDTO.getGoogleAccountId().equals("0"))){
            String password = userDTO.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            newUser.setPassword(encodedPassword);
        }
        return userRepository.save(newUser);
    }

    @Override
    public UserResponse login(String phone, String password) throws Exception {
        Optional<User> users = userRepository.findByPhone(phone);
        if (users.isEmpty()) {
            throw new DataNotFoundException("Invalid phone number or password");
        }

        User existingUser = users.get();

        if (!existingUser.getStatus()) {
            throw new BadCredentialsException("Account is banned!");
        }

        try {
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(phone, password);

            authenticationManager.authenticate(authenticationToken);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid phone number or password");
        }

        Long id = existingUser.getId();
        String token = jwtToken.generationToken(existingUser);
        Long roleId = existingUser.getRoles().getId();
        phone = existingUser.getPhone();
        String name = existingUser.getFullName();
        String address = existingUser.getAddress();
        Boolean status = existingUser.getStatus();

        return new UserResponse(id, token, roleId, phone, name, address, status);
    }


    @Override
    public User updatePass(UpdatePassDTO updatePassDTO, Long id) throws Exception {
        User existUser = userRepository.findById(id).
                orElseThrow(()->new DataNotFoundException("Not found userId: "+id));
        if (!passwordEncoder.matches(updatePassDTO.getPassword(), existUser.getPassword())) {
            throw new BadCredentialsException("Wrong password");
        }
        String password = updatePassDTO.getNewPass();
        String encodedPassword = passwordEncoder.encode(password);
        existUser.setPassword(encodedPassword);
        return userRepository.save(existUser);
    }

    @Override
    public User updateActive(UserResponse userResponse, Long id) throws Exception {
        User existingUser = userRepository.findById(id)
                .orElseThrow(()->new DataNotFoundException("User not found"));
        existingUser.setStatus(userResponse.getStatus());
        userRepository.save(existingUser);
        return existingUser;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id)
                .map(user -> UserDTO.builder()
                        .rolesId(user.getRoles().getId())
                        .id(user.getId())
                        .profileImage(user.getProfileImage())
                        .fullName(user.getFullName())
                        .googleAccountId(user.getGoogleAccountId())
                        .facebookAccountId(user.getFacebookAccountId())
                        .phone(user.getPhone())
                        .address(user.getAddress())
                        .build()
                );
    }


    @Override
    public Optional<User> findUserByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }

    @Override
    public UpdateUserInformationDTO updateUserInformation(Long id, UserDTO dto) throws DataNotFoundException{
        User user = userRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("User not found with id: " + id));

        if (dto.getFullName() != null) user.setFullName(dto.getFullName());
        if (dto.getPhone() != null) user.setPhone(dto.getPhone());
        if (dto.getGoogleAccountId() != null) user.setGoogleAccountId(dto.getGoogleAccountId());
        if (dto.getAddress() != null) user.setAddress(dto.getAddress());
        if (dto.getProfileImage() != null) user.setProfileImage(dto.getProfileImage());
        if (dto.getStatus() != null) user.setStatus(dto.getStatus());
        if (dto.getRolesId() != null) {
            Role role = roleRepository.findById(dto.getRolesId())
                    .orElseThrow(() -> new DataNotFoundException("Role not found with id: " + dto.getRolesId()));
            user.setRoles(role);
        }

        User updated = userRepository.save(user);

        return UpdateUserInformationDTO.builder()
                .id(updated.getId())
                .fullName(updated.getFullName())
                .phone(updated.getPhone())
                .address(updated.getAddress())
                .profileImage(updated.getProfileImage())
                .status(updated.getStatus())
                .roleName(updated.getRoles().getName())
                .build();
    }
}
