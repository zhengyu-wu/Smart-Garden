package com.SmartGarden.SmartGarden.service;

import com.SmartGarden.SmartGarden.model.WateringConfig;

import java.util.List;

public interface WateringConfigService {
    WateringConfig addConfig(WateringConfig wateringConfig,int gardenId);
    boolean deleteConfig(int configId);
    boolean deleteByGardenId(int gardenId);
    List<WateringConfig> getConfigByGardenId(int gardenId);
    boolean updateConfig(WateringConfig wateringConfig);
    List<WateringConfig> getAllConfig();
}
