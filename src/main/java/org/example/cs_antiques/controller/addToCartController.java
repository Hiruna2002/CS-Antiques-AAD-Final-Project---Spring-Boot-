package org.example.cs_antiques.controller;

import org.example.cs_antiques.dto.CartDTO;
import org.example.cs_antiques.dto.ResponseDTO;
import org.example.cs_antiques.entity.User;
import org.example.cs_antiques.repo.UserRepository;
import org.example.cs_antiques.service.AddToCartService;
import org.example.cs_antiques.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("api/v1/addToCart")
public class addToCartController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddToCartService addToCartService;

    @PostMapping(value = "saveItem")
    public ResponseEntity<ResponseDTO> addToCart(@RequestParam CartDTO cartDTO, Authentication authentication) {

        String email = authentication.getName(); // logged in user’s username
        User user = userRepository.findByEmail(email);
        String userId = user.getId();

        int response = addToCartService.addItemToCart(userId, cartDTO);
        switch (response) {
            case VarList.Created -> {
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(new ResponseDTO(VarList.Created, "Success", cartDTO));
            }
            case VarList.Not_Acceptable -> {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ResponseDTO(VarList.Bad_Request, "Not Saved", null));
            }
            default -> {
                return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                        .body(new ResponseDTO(VarList.Bad_Gateway, "Error", null));
            }
        }

//        try {
//            int response = addToCartService.saveItem(cartDto);
//            switch (response) {
//                case VarList.Created -> {
//                    return ResponseEntity.status(HttpStatus.CREATED)
//                            .body(new ResponseDTO(VarList.Created, "Success", cartDto));
//                }
//                case VarList.Not_Acceptable -> {
//                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                            .body(new ResponseDTO(VarList.Bad_Request, "Not Saved", null));
//                }
//                default -> {
//                    return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
//                            .body(new ResponseDTO(VarList.Bad_Gateway, "Error", null));
//                }
//            }
//        }catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
//        }
    }
}
