package com.SmartGarden.SmartGarden.controller;


import com.SmartGarden.SmartGarden.model.Garden;
import com.SmartGarden.SmartGarden.service.GardenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/garden")
public class GardenController {

    @Autowired
    private GardenService gardenService;

    @ResponseBody
    @PostMapping("/addGarden")
    public boolean addGarden(Garden garden){
        return gardenService.addGarden(garden);
    }

    @ResponseBody
    @PostMapping("/addGardenWithUserId")
    public boolean addGardenWithUserId(Garden garden,int userId){
        return gardenService.addGardenWithUser(garden,userId);
    }

    @ResponseBody
    @PostMapping("/deleteByGardenId")
    public boolean deleteByGardenId(int gardenId){
        return gardenService.deleteByGardenId(gardenId);
    }

    @ResponseBody
    @GetMapping("/getByUserId")
    public List<Garden> getWithUserId(int userId) {return gardenService.getGardenByUserId(userId);}

    @ResponseBody
    @PostMapping("/deleteByUserId")
    public boolean deleteByUserId(int userId) {return gardenService.deleteByUserId(userId);}


}
