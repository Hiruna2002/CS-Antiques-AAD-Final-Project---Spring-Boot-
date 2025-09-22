package org.example.cs_antiques.service;

import org.example.cs_antiques.dto.OrderDTO;

import java.util.List;

public interface PlaceOrderService{
    int orderSave(OrderDTO orderDTO, String cusId);

    List<OrderDTO> getAllOrders();
}
