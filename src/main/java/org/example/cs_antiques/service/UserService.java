package org.example.cs_antiques.service;

import org.example.cs_antiques.dto.UserDTO;

import java.util.List;

public interface UserService {
    int saveUser(UserDTO userDTO);

    UserDTO searchUser(String username);

    UserDTO getUserByEmail(String email);

//    boolean updateUserRole(String email, String role);

    List<UserDTO> getAllUsers();

    boolean deleteUserByEmail(String email);

//    UserDTO login(String name, String email);
}
