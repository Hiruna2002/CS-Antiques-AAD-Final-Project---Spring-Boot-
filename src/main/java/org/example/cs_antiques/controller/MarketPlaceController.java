package org.example.cs_antiques.controller;

import org.example.cs_antiques.dto.ProductDTO;
import org.example.cs_antiques.dto.ResponseDTO;
import org.example.cs_antiques.service.MarketPlaceService;
import org.example.cs_antiques.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("api/v1/marketplace")
public class MarketPlaceController {

    @Autowired
    private MarketPlaceService marketPlaceService;

    @RequestMapping(value = "/getAll")
    public ResponseEntity<ResponseDTO> getAll() {
        List<ProductDTO>productDTOS = marketPlaceService.getAllProduct();
        return ResponseEntity.ok()
                .body(new ResponseDTO(VarList.OK, "Success", productDTOS));
    }
}
