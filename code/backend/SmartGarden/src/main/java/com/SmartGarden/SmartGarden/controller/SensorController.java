package com.SmartGarden.SmartGarden.controller;


import com.SmartGarden.SmartGarden.model.Sensor;
import com.SmartGarden.SmartGarden.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/sensors")
public class SensorController {

    @Autowired
    private SensorService sensorService;

    @ResponseBody
    @GetMapping("/getAllSensor")
    public List<Sensor> getAllSensor(){
        return sensorService.getAllSensor();
    }

    @ResponseBody
    @GetMapping("/getSensorBySensorId")
    public Sensor getSensorBySensorId(int sensorId)
    {
        return sensorService.getSensorBySensorId(sensorId);
    }

    @ResponseBody
    @GetMapping("/getSensorByGardenId")
    public List<Sensor> getSensorByGardenId(int gardenId){return sensorService.getByGardenId(gardenId);}

    @ResponseBody
    @GetMapping("/getHumiSensorByGardenId")
    public List<Sensor> getHumiSensorByGardenId(int gardenId){
        return sensorService.getHumiSensorByGardenId(gardenId);
    }

    @ResponseBody
    @GetMapping("/getTempSensorByGardenId")
    public List<Sensor> getTempSensorByGardenId(int gardenId){
        return sensorService.getTempSensorByGardenId(gardenId);
    }


    @ResponseBody
    @PostMapping("/addSensorWithGardenId")
    public boolean addSensorWithGardenId(Sensor sensor,int gardenId){
        return sensorService.addSensorWithGardenId(sensor,gardenId);
    }


    @ResponseBody
    @PostMapping("/modifySensorState")
    public boolean modifySensorState(int sensorId,int sensorState){
        return sensorService.changeSensorState(sensorId,sensorState);
    }

    @ResponseBody
    @PostMapping("/updateSensorBySensorId")
    public boolean updateSensorBySensorId(Sensor sensor){
        return sensorService.updateSensor(sensor);
    }

    @ResponseBody
    @PostMapping("/deleteSensorBySensorId")
    public boolean deleteSensorBySensorId(int sensorId){
        return sensorService.deleteSensor(sensorId);
    }

    @ResponseBody
    @GetMapping("/getSensorNumberByGardenId")
    public int getSensorNumberByGardenId(int gardenId){
        return sensorService.getSensorNumberByGardenId(gardenId);
    }


    @ResponseBody
    @PostMapping("/modifySensorPosition")
    public boolean modifySensorPosition(int sensorId,Double positionX,Double positionY){
        return sensorService.changeSensorPosition(sensorId,positionX,positionY);
    }

}
