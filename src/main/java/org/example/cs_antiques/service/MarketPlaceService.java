package org.example.cs_antiques.service;

import org.example.cs_antiques.dto.ProductDTO;
import org.example.cs_antiques.entity.Product;

import java.util.List;

public interface MarketPlaceService {
    List<ProductDTO> getAllProduct();

    ProductDTO getById(String id);
}
