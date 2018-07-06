package com.SmartGarden.SmartGarden.service.impl;


import com.SmartGarden.SmartGarden.model.Garden;
import com.SmartGarden.SmartGarden.model.User;
import com.SmartGarden.SmartGarden.repository.GardenRepository;
import com.SmartGarden.SmartGarden.service.GardenService;
import com.SmartGarden.SmartGarden.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GardenServiceImpl implements GardenService {

    @Autowired
    private GardenRepository gardenRepository;

    @Autowired
    private UserService userService;

    @Override
    public List<Garden> getGardenByUserId(int userId) {
        return gardenRepository.findByUser_UserId(userId);
    }


    @Override
    public boolean deleteByGardenId(int gardenId) {
        try {
            gardenRepository.deleteById(gardenId);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean deleteByUserId(int userId) {
        try {
            gardenRepository.deleteByUser_UserId(userId);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean addGardenWithUser(Garden garden, int userId) {
        User tmpUser= userService.selectById(userId);
        if(tmpUser==null)
            return false;
        garden.setUser(tmpUser);
        try {
            gardenRepository.save(garden);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public Garden getGardenByGardenId(int gardenId) {
        return gardenRepository.findByGardenId(gardenId);
    }
}