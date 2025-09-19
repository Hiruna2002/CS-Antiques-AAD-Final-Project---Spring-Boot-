package org.example.cs_antiques.service;

import org.example.cs_antiques.dto.CartDTO;
import org.example.cs_antiques.dto.UserDTO;
import org.example.cs_antiques.entity.Cart;

public interface AddToCartService {

//    int saveItem(UserDTO userDTO);

    int addItemToCart(String userId, CartDTO cartDTO);
}
