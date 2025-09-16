package org.example.cs_antiques.controller;

import org.example.cs_antiques.dto.AuthDTO;
import org.example.cs_antiques.dto.ProductDTO;
import org.example.cs_antiques.dto.ResponseDTO;
import org.example.cs_antiques.service.ProductService;
import org.example.cs_antiques.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("api/v1/addProduct")
public class addProductController {

    @Autowired
    private ProductService productService;


    @PostMapping(value = "/saveProduct")
    public ResponseEntity<ResponseDTO>savePayment(@RequestBody ProductDTO productDTO){
        try {
            int response = productService.saveProduct(productDTO);
            switch (response) {
                case VarList.Created -> {
                    return ResponseEntity.status(HttpStatus.CREATED)
                            .body(new ResponseDTO(VarList.Created, "Success", productDTO));
                }
                case VarList.Not_Acceptable -> {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new ResponseDTO(VarList.Bad_Request, "Not Saved", null));
                }
                default -> {
                    return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                            .body(new ResponseDTO(VarList.Bad_Gateway, "Error", null));
                }
            }
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

}
