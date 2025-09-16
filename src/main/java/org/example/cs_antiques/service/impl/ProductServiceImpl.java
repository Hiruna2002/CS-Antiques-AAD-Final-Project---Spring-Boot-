package org.example.cs_antiques.service.impl;

import org.example.cs_antiques.dto.ProductDTO;
import org.example.cs_antiques.entity.Product;
import org.example.cs_antiques.repo.ProductRepository;
import org.example.cs_antiques.service.ProductService;
import org.example.cs_antiques.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public int saveProduct(ProductDTO productDTO) {
        productRepository.save(modelMapper.map(productDTO, Product.class));
        return VarList.Created;
    }
}
