package org.example.cs_antiques.service.impl;

import org.example.cs_antiques.dto.BlogDTO;
import org.example.cs_antiques.dto.LibraryDTO;
import org.example.cs_antiques.entity.Blog;
import org.example.cs_antiques.entity.Library;
import org.example.cs_antiques.repo.LibraryRepo;
import org.example.cs_antiques.service.LibraryService;
import org.example.cs_antiques.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LibraryServiceImpl implements LibraryService {

    @Autowired
    private LibraryRepo libraryRepo;

    @Autowired
    private ModelMapper modelMapper;
    @Override
    public int saveImage(LibraryDTO libraryDTO) {
        libraryRepo.save(modelMapper.map(libraryDTO, Library.class));
        return VarList.Created;
    }

    @Override
    public List<LibraryDTO> getAll() {
        return libraryRepo.findAll()
                .stream()
                .map(library -> modelMapper.map(library, LibraryDTO.class))
                .collect(Collectors.toList());
    }
}
