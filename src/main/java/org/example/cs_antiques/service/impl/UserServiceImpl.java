package org.example.cs_antiques.service.impl;

import jakarta.transaction.Transactional;
import org.example.cs_antiques.dto.UserDTO;
import org.example.cs_antiques.entity.User;
import org.example.cs_antiques.repo.UserRepository;
import org.example.cs_antiques.service.UserService;
import org.example.cs_antiques.util.JwtUtil;
import org.example.cs_antiques.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserDetailsService, UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public int saveUser(UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            return VarList.Not_Acceptable;
        } else {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
//            userDTO.setRole("USER");
            userRepository.save(modelMapper.map(userDTO, User.class));
            return VarList.Created;
        }
    }

    @Override
    public UserDTO searchUser(String username) {
        if (userRepository.existsByEmail(username)) {
            User user = userRepository.findByEmail(username);
            return modelMapper.map(user,UserDTO.class);
        } else {
            return null;
        }
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return new UserDTO(
                    user.getId(),
                    user.getName(),
                    user.getAddress(),
                    user.getNumber(),
                    user.getEmail(),
                    user.getPassword(),
                    user.getRole()
            );
        } else {
            return null; // Handle properly in the controller
        }
    }

//    @Override
//    public boolean updateUserRole(String email, String role) {
//        Optional<User> optionalUser = Optional.ofNullable(userRepository.findByEmail(email));
//
//        if (optionalUser.isPresent()) {
//            User user = optionalUser.get();
//            user.setRole(newRole);
//            userRepository.save(user);
//            return true;
//        }
//        return false;
//    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public boolean deleteUserByEmail(String email) {
        Optional<User> user = Optional.ofNullable(userRepository.findByEmail(email));
        if (user.isPresent()) {
            userRepository.delete(user.get());
            return true;
        }
        return false;
    }

//    @Override
//    public UserDTO login(String name, String email) {
//        User user = userRepository.findByNameAndEmail(name,email);
//        if (user != null) {
//            return new UserDTO(
//                    user.getName(),
//                    user.getEmail(),
//                    user.getPassword(),
//                    user.getRole()
//            );
//        } else {
//            return null; // Handle properly in the controller
//        }
//    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getAuthority(user));
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole()));
        return authorities;
    }

    public UserDTO loadUserDetailsByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        return modelMapper.map(user,UserDTO.class);
    }
}
