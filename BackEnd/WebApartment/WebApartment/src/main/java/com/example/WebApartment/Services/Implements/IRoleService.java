package com.example.WebApartment.Services.Implements;

import com.example.WebApartment.DTO.RoleDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.Role;

import java.util.List;

public interface IRoleService  {
    Role createRole(RoleDTO roleDTO) throws DataNotFoundException;
    List<Role> getAllRoles();
    Role updateRole(Long id, RoleDTO roleDTO) throws DataNotFoundException;
    void deleteRole(Long id);
}
