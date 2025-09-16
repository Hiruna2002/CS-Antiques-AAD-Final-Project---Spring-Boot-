package org.example.cs_antiques.repo;

import org.example.cs_antiques.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, String> {

}
