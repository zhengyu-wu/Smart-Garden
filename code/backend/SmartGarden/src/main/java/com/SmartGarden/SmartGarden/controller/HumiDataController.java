package com.SmartGarden.SmartGarden.controller;

import com.SmartGarden.SmartGarden.model.HumiData;
import com.SmartGarden.SmartGarden.service.HumiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/*
* 提供了访问湿度数据的接口
* */
@Controller
@RequestMapping("/humidity")
public class HumiDataController {

    @Autowired
    private HumiService humiService;

    @ResponseBody
    @GetMapping("/getLast20HumiDataBySensorId")
    public List<HumiData> getLast20HumiDataBySensorId(int sensorId){
        return humiService.getLast20DataBySensorId(sensorId);
    }

    @ResponseBody
    @GetMapping("/getLast15HumiDataBySensorId")
    public List<HumiData> getLast15HumiDataBySensorId(int sensorId){
        return humiService.getLast15DataBySensorId(sensorId);
    }

    @ResponseBody
    @GetMapping("/getLastHumiDataByGardenId")
    public List<HumiData> getLastHumiDataByGardenId(int gardenId){
        return humiService.getLastHumiDataByGardenId(gardenId);
    }

    @ResponseBody
    @PostMapping("/addHumiDataWithSensorId")
    public boolean addHumiData(HumiData humiData,int sensorId){
        return humiService.addHumiData(humiData,sensorId);
    }

    @ResponseBody
    @PostMapping("/deleteByHumiDataId")
    public boolean deleteHumiData(int humiDataId){
        return humiService.deleteByHumiDataId(humiDataId);
    }

}
