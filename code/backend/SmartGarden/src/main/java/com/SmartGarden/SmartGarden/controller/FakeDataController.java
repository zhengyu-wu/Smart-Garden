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
        fakeDataService.generateData();
    }

    @ResponseBody
    @GetMapping("/generateDataWithSensorId")
    public void generateDataWithSensorId(int sensorId){
        fakeDataService.generateDataWithSensorId(sensorId);
    }
}
