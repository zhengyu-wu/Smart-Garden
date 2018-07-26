package com.SmartGarden.SmartGarden.controller;


import com.SmartGarden.SmartGarden.model.Nozzle;
import com.SmartGarden.SmartGarden.service.NozzleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/nozzles")
public class NozzleController {

    @Autowired
    private NozzleService nozzleService;

    @ResponseBody
    @GetMapping("/getNozzleByGardenId")
    public List<Nozzle> getNozzleByGardenId(int gardenId){
        return nozzleService.getByGardenId(gardenId);
    }

    @ResponseBody
    @GetMapping("/getNozzleByNozzleId")
    public Nozzle getNozzleByNozzleId(int nozzleId){
        return nozzleService.getByNozzleId(nozzleId);
    }

    @ResponseBody
    @PostMapping("/addNozzleByGardenId")
    public Nozzle addNozzleWithGardenId(Nozzle nozzle,int gardenId){
        return nozzleService.addNozzleWithGardenId(nozzle,gardenId);
    }

    @ResponseBody
    @PostMapping("/deleteNozzleByNozzleId")
    public boolean deleteByNozzleId(int nozzleId){
        return nozzleService.deleteByNozzleId(nozzleId);
    }

    @ResponseBody
    @PostMapping("/modifyRadiusByNozzleId")
    public boolean modifyRadius(int nozzleId,Double radius){
        return nozzleService.modifyRadius(nozzleId,radius);
    }

    @ResponseBody
    @PostMapping("/modifyStateByNozzleId")
    public boolean modifyState(int nozzleId,int state){
        return nozzleService.modifyState(nozzleId,state);
    }

    @ResponseBody
    @PostMapping("/modifyPositionByNozzleId")
    public boolean modifyPosition(int nozzleId,Double positionX,Double positionY){
        return nozzleService.modifyPosition(nozzleId,positionX,positionY);
    }

}
