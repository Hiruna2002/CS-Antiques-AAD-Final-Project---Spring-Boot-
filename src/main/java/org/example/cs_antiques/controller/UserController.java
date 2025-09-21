package org.example.cs_antiques.controller;

import org.example.cs_antiques.dto.AuthDTO;
import org.example.cs_antiques.dto.ResponseDTO;
import org.example.cs_antiques.dto.UserDTO;
import org.example.cs_antiques.entity.User;
import org.example.cs_antiques.service.UserService;
import org.example.cs_antiques.util.JwtUtil;
import org.example.cs_antiques.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("api/v1/user")
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<ResponseDTO> registerUser(@RequestBody UserDTO userDTO) {
        try {
            int response = userService.saveUser(userDTO);
            switch (response) {
                case VarList.Created -> {
                    String token = jwtUtil.generateToken(userDTO);
                    AuthDTO authDTO = new AuthDTO();
                    authDTO.setEmail(userDTO.getEmail());
                    authDTO.setToken(token);
                    return ResponseEntity.status(HttpStatus.CREATED)
                            .body(new ResponseDTO(VarList.Created, "Success", authDTO));
                }
                case VarList.Not_Acceptable -> {
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                            .body(new ResponseDTO(VarList.Not_Acceptable, "Email Already Used", null));
                }
                default -> {
                    return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                            .body(new ResponseDTO(VarList.Bad_Gateway, "Error", null));
                }
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

    @GetMapping(value = "/getUserByEmail")
    public ResponseEntity<ResponseDTO> getUserDetail(@RequestParam String email) {

        UserDTO user = userService.getUserByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(new ResponseDTO(VarList.Created, "Success", user));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(VarList.Not_Acceptable, "User not found", null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody UserDTO userDTO) {
        UserDTO user = userService.getUserByEmail(userDTO.getEmail());
            if (user != null) {
                if (user.getEmail().equals(userDTO.getEmail())
                        && passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {

                    // Generate JWT token here if needed
                    return ResponseEntity.ok(
                            new ResponseDTO(VarList.Created, "Login Success", user)
                    );
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body(new ResponseDTO(VarList.Not_Acceptable, "Email or Password incorrect", null));
                }

            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ResponseDTO(VarList.Not_Acceptable, "User not found", null));
            }
        }



    @GetMapping("/getAll")
    public ResponseEntity<ResponseDTO> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(VarList.Not_Found, "No users found", null));
        }
        return ResponseEntity.ok(new ResponseDTO(VarList.Created, "Users retrieved successfully", users));
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<ResponseDTO> deleteUser(@PathVariable String email) {
        boolean deleted = userService.deleteUserByEmail(email);
        if (deleted) {
            return ResponseEntity.ok(new ResponseDTO(VarList.Created, "User deleted successfully", null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(VarList.Not_Found, "User not found", null));
        }
    }
}

