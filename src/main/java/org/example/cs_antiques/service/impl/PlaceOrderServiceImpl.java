package org.example.cs_antiques.service.impl;

import org.example.cs_antiques.dto.CartDTO;
import org.example.cs_antiques.dto.OrderDTO;
import org.example.cs_antiques.entity.Order;
import org.example.cs_antiques.entity.User;
import org.example.cs_antiques.repo.PlaceOrderRepo;
import org.example.cs_antiques.service.PlaceOrderService;
import org.example.cs_antiques.util.CardService;
import org.example.cs_antiques.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceOrderServiceImpl implements PlaceOrderService {
    @Autowired
    private PlaceOrderRepo placeOrderRepo;

    @Autowired
    private ModelMapper modelMapper;

    CardService cardService = new CardService();

    @Override
    public int orderSave(OrderDTO orderDTO, String cusId) {

        String rawCard = orderDTO.getCardNumber();// Example VISA test card
        String hashedCard = cardService.encryptCard(rawCard);
        boolean isMatch = cardService.matchCard(rawCard, hashedCard);

        if (isMatch) {
            orderDTO.setCusId(cusId);
            orderDTO.setCardNumber(hashedCard);
            Order order = new Order();
            order.setCusId(orderDTO.getCusId());
            order.setFirstName(orderDTO.getFirstName());
            order.setLastName(orderDTO.getLastName());
            order.setEmail(orderDTO.getEmail());
            order.setPhone(orderDTO.getPhone());
            order.setAddress(orderDTO.getAddress());
            order.setCity(orderDTO.getCity());
            order.setZipCode(orderDTO.getZipCode());
            order.setCountry(orderDTO.getCountry());
            order.setSaveAddress(orderDTO.getSaveAddress());
            order.setTotalPrice(orderDTO.getTotalPrice());
            order.setPayMethod(orderDTO.getPayMethod());
            order.setCardNumber(orderDTO.getCardNumber());
            order.setExpDate(orderDTO.getExpDate());
            order.setCvv(orderDTO.getCvv());
            order.setCardName(orderDTO.getCardName());

            placeOrderRepo.save(order);
            return VarList.Created;
        }
    return VarList.Not_Found;
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        return placeOrderRepo.findAll()
                .stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
    }
}

