package com.SmartGarden.SmartGarden.service.impl;

import com.SmartGarden.SmartGarden.model.Garden;
import com.SmartGarden.SmartGarden.model.WateringConfig;
import com.SmartGarden.SmartGarden.repository.WateringConfigRepository;
import com.SmartGarden.SmartGarden.service.GardenService;
import com.SmartGarden.SmartGarden.service.WateringConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WateringConfigServiceImpl implements WateringConfigService {

    @Autowired
    WateringConfigRepository wateringConfigRepository;

    @Autowired
    private GardenService gardenService;

    @Override
    public WateringConfig addConfig(WateringConfig wateringConfig, int gardenId) {
        Garden tmpGarden=gardenService.getGardenByGardenId(gardenId);
        if(tmpGarden==null)
            return null;
        wateringConfig.setGarden(tmpGarden);
        try {
            wateringConfigRepository.save(wateringConfig);
            return wateringConfig;
        }
        catch (Exception e){
            return null;
        }
    }

    @Override
    public boolean deleteConfig(int configId) {
        try {
            wateringConfigRepository.deleteById(configId);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean deleteByGardenId(int gardenId) {
        List<WateringConfig> tmpList=wateringConfigRepository.findByGarden_GardenId(gardenId);
        try {
            for (WateringConfig tmpConfig:tmpList
                    ) {
                wateringConfigRepository.deleteById(tmpConfig.getConfigId());
            }
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public List<WateringConfig> getConfigByGardenId(int gardenId) {
        return wateringConfigRepository.findByGarden_GardenId(gardenId);
    }

    @Override
    public boolean updateConfig(WateringConfig wateringConfig) {
        WateringConfig tmpConfig=wateringConfigRepository.findByConfigId(wateringConfig.getConfigId());
        if(tmpConfig==null)
            return false;
        try {
            wateringConfigRepository.save(wateringConfig);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public List<WateringConfig> getAllConfig() {
        return wateringConfigRepository.findAll();
    }
}