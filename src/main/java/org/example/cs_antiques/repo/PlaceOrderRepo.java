package org.example.cs_antiques.repo;

import org.example.cs_antiques.entity.Cart;
import org.example.cs_antiques.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceOrderRepo extends JpaRepository<Order,String> {

}
