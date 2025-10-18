package org.example.cs_antiques.service;

import org.example.cs_antiques.dto.LibraryDTO;

import java.util.List;

public interface LibraryService {
    int saveImage(LibraryDTO libraryDTO);

    List<LibraryDTO> getAll();
}
