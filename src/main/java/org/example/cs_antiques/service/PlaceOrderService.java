package org.example.cs_antiques.service;

import org.example.cs_antiques.dto.OrderDTO;

public interface PlaceOrderService{
    int orderSave(OrderDTO orderDTO, String cusId);
}
