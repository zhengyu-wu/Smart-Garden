package com.SmartGarden.SmartGarden.service;


import com.SmartGarden.SmartGarden.model.HumiData;

import java.util.List;

/*
*
* */
public interface HumiService {
    boolean addHumiData(HumiData humiData);
    boolean deleteByHumiDataId(Integer humiDataId);
    List<HumiData> getLast20DataBySensorId(int sensorId);
    List<HumiData> getLastHumiDataByGardenId(int gardenId);
}
