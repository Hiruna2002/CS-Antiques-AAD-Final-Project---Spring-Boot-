package org.example.cs_antiques.repo;

import org.example.cs_antiques.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddToCartRepo extends JpaRepository<Cart,String> {

}
