package org.example.cs_antiques.controller;

import org.example.cs_antiques.dto.CartDTO;
import org.example.cs_antiques.dto.OrderDTO;
import org.example.cs_antiques.dto.ResponseDTO;
import org.example.cs_antiques.repo.PlaceOrderRepo;
import org.example.cs_antiques.repo.UserRepository;
import org.example.cs_antiques.service.PlaceOrderService;
import org.example.cs_antiques.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("api/v1/placeOrder")
public class PlaceOrderController {
    @Autowired
    private PlaceOrderService placeOrderService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "/saveOrder")
    public ResponseEntity<ResponseDTO> addToCart(@RequestBody OrderDTO orderDTO) {
        String email = orderDTO.getCusId();
        String cusId = userRepository.findByEmail(email).getId();
        System.out.println(cusId);

        try {
            int response = placeOrderService.orderSave(orderDTO,cusId);
            switch (response) {
                case VarList.Created -> {
                    return ResponseEntity.status(HttpStatus.CREATED)
                            .body(new ResponseDTO(VarList.Created, "Success", orderDTO));
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
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

    @GetMapping(value = "/getAll")
    public ResponseEntity<ResponseDTO>getOrders(){
        List<OrderDTO> orderDTOS = placeOrderService.getAllOrders();
        return ResponseEntity.ok()
                .body(new ResponseDTO(VarList.OK, "Success", orderDTOS));
    }
}
