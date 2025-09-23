package org.example.cs_antiques.controller;

import org.example.cs_antiques.dto.BlogDTO;
import org.example.cs_antiques.dto.OrderDTO;
import org.example.cs_antiques.dto.ResponseDTO;
import org.example.cs_antiques.service.BlogService;
import org.example.cs_antiques.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("api/v1/blog")
public class MiniBlogController {

    @Autowired
    private BlogService blogService;

    @PostMapping (value = "/savePost")
    public ResponseEntity<ResponseDTO> savePost(@RequestBody BlogDTO blogDTO) {
        try {
            int response = blogService.savePost(blogDTO);
            switch (response) {
                case VarList.Created -> {
                    return ResponseEntity.status(HttpStatus.CREATED)
                            .body(new ResponseDTO(VarList.Created, "Success", blogDTO));
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
    public ResponseEntity<ResponseDTO>getALl(){
        List<BlogDTO> blogDTOS = blogService.getAll();
        return ResponseEntity.ok()
                .body(new ResponseDTO(VarList.OK, "Success", blogDTOS));
    }
}
