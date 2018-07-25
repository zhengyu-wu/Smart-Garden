package com.SmartGarden.SmartGarden.controller;


import com.SmartGarden.SmartGarden.service.FakeDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/fakeData")
public class FakeDataController {

    @Autowired
    private FakeDataService fakeDataService;

    @ResponseBody
    @GetMapping("/generateData")
    public void generateData(){
        try{
            fakeDataService.generateData();
        }
        catch (Exception e){
            return;
        }
    }

    @ResponseBody
    @GetMapping("/generateDataWithSensorId")
    public void generateDataWithSensorId(int sensorId){
        try {
            fakeDataService.generateDataWithSensorId(sensorId);
        }
        catch (Exception e){
            return;
        }
    }
    @ResponseBody
    @GetMapping("/generateDataWithGardenId")
    public void generateDataWithGardenId(int gardenId){
        fakeDataService.generateDataWithGardenId(gardenId);
    }
}
