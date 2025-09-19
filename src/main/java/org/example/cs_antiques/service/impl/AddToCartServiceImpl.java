package org.example.cs_antiques.service.impl;

import org.example.cs_antiques.dto.CartDTO;
import org.example.cs_antiques.entity.Cart;
import org.example.cs_antiques.repo.AddToCartRepo;
import org.example.cs_antiques.service.AddToCartService;
import org.example.cs_antiques.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddToCartServiceImpl implements AddToCartService {

    @Autowired
    private AddToCartRepo addToCartRepo;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public int addItemToCart(String userId, CartDTO cartDTO) {
        cartDTO.setCusId(userId);
        addToCartRepo.save(modelMapper.map(cartDTO, Cart.class));
        return VarList.Created;
    }
}
