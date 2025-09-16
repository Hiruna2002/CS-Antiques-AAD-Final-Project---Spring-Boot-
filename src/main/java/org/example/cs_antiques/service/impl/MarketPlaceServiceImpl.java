package org.example.cs_antiques.service.impl;

import jakarta.persistence.EntityNotFoundException;
import org.example.cs_antiques.dto.ProductDTO;
import org.example.cs_antiques.entity.Product;
import org.example.cs_antiques.repo.ProductRepository;
import org.example.cs_antiques.service.MarketPlaceService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MarketPlaceServiceImpl implements MarketPlaceService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ProductDTO> getAllProduct() {
        return productRepository.findAll()
                .stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO getById(String id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Product not found with id " + id));
        return modelMapper.map(product, ProductDTO.class);
    }
}
