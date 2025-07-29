package com.example.WebApartment.Services.Implements;

import com.example.WebApartment.DTO.WardDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.Ward;

import java.util.List;

public interface IWardService {
    Ward createWard(WardDTO wardDTO) throws DataNotFoundException;
    List<Ward> getAllWards();
    Ward updateWard(Long id, WardDTO wardDTO) throws DataNotFoundException;
    void deleteWard(Long id);
}
