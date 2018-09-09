package com.SmartGarden.SmartGarden.controller;


import com.SmartGarden.SmartGarden.model.WateringConfig;
import com.SmartGarden.SmartGarden.service.WateringConfigService;
import com.SmartGarden.SmartGarden.service.WateringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/waterConfig")
public class WaterConfigController {
    @Autowired
    private WateringConfigService wateringConfigService;

    @Autowired
    private WateringService wateringService;

    @ResponseBody
    @GetMapping("/getConfigByGardenId")
    public List<WateringConfig> getConfigByGardenId(int gardenId){
        return wateringConfigService.getConfigByGardenId(gardenId);
    }

    @ResponseBody
    @GetMapping("/hasActiveConfig")
    public boolean hasActiveConfig(int gardenId)
    {
        return wateringConfigService.hasActiveConfig(gardenId);
    }

    @ResponseBody
    @GetMapping("/getAllConfig")
    public List<WateringConfig> getAllConfig(){
        return wateringConfigService.getAllConfig();
    }

    @ResponseBody
    @PostMapping("/addConfigByGardenId")
    public WateringConfig addConfig(WateringConfig wateringConfig,int gardenId){
        return wateringConfigService.addConfig(wateringConfig,gardenId);
    }

    @ResponseBody
    @PostMapping("/deleteByConfigId")
    public boolean deleteConfig(int configId){
        return wateringConfigService.deleteConfig(configId);
    }

    @ResponseBody
    @PostMapping("/changeConfigState")
    public boolean changeConfigState(int configId){
        return wateringConfigService.changeConfigState(configId);
    }

    @ResponseBody
    @PostMapping("/deleteByGardenId")
    public boolean deleteByGardenId(int gardenId){
        return wateringConfigService.deleteByGardenId(gardenId);
    }

    @ResponseBody
    @PostMapping("/updateConfig")
    public boolean updateConfig(WateringConfig wateringConfig)
    {
        return wateringConfigService.updateConfig(wateringConfig);
    }

    @ResponseBody
    @PostMapping("/changeTempConfig")
    public boolean changeTempConfig(int configId,Double bestTempMin,Double bestTempMax){
        return wateringConfigService.changeTempConfig(configId,bestTempMin,bestTempMax);
    }

    @ResponseBody
    @PostMapping("/changeHumiConfig")
    public boolean changeHumiConfig(int configId,Double bestHumiMin,Double bestHumiMax){
        return wateringConfigService.changeHumiConfig(configId,bestHumiMin,bestHumiMax);
    }

    @ResponseBody
    @PostMapping("/runAutoWatering")
    public void runAutoWatering(){
        wateringService.autoWatering();
    }
}
