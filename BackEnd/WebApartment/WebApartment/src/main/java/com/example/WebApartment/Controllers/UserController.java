package com.example.WebApartment.Controllers;

import com.example.WebApartment.DTO.UpdatePassDTO;
import com.example.WebApartment.DTO.UserDTO;
import com.example.WebApartment.Models.User;
import com.example.WebApartment.Responses.UserResponse;
import com.example.WebApartment.Services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDTO userDTO,
                                      BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessage = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessage);
            }
            if (!userDTO.getPassword().equals(userDTO.getRetypePass())) {
                return ResponseEntity.badRequest().body("Password and retypepass not same");
            }
            User user = userService.createUser(userDTO);

            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserDTO usersDTO) {
        try {
            UserResponse responseDTO = userService.login(usersDTO.getPhone(), usersDTO.getPassword());
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUser() {
        List<User> getAll = userService.getAllUsers();
        return ResponseEntity.ok(getAll);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        userService.getUserById(id);
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/status/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateActive(@PathVariable Long id, @Valid @RequestBody UserResponse userResponse) {
        try {
            userService.updateActive(userResponse, id);
            return ResponseEntity.ok("Update successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }

    @PutMapping("/password/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updatePass(@PathVariable("id") Long id, @Valid @RequestBody UpdatePassDTO updatePassDTO){
        try {
            if(!updatePassDTO.getNewPass().equals(updatePassDTO.getRetypePass())){
                return ResponseEntity.badRequest().body("New password and retype password not same");
            }
            User user = userService.updatePass(updatePassDTO, id);
            return ResponseEntity.ok(user);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
