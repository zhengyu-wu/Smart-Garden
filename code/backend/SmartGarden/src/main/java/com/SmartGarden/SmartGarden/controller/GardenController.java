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
    @PostMapping("/addGardenWithUserId")
    public Garden addGardenWithUserId(Garden garden,int userId){
        return gardenService.addGardenWithUserId(garden,userId);
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
    @GetMapping("/getByGardenId")
    public Garden getWithGardenId(int gardenId){return gardenService.getGardenByGardenId(gardenId);}

    @ResponseBody
    @PostMapping("/deleteByUserId")
    public boolean deleteByUserId(int userId) {return gardenService.deleteByUserId(userId);}

    @ResponseBody
    @PostMapping("/updateGarden")
    public boolean updateGarden(Garden garden)
    {
        return gardenService.update(garden);
    }

    @ResponseBody
    @GetMapping("/getGardenNumberByUserId")
    public int getGardenNumberByUserId(int userId){
        return gardenService.getGardenNumberByUserId(userId);
    }

}
