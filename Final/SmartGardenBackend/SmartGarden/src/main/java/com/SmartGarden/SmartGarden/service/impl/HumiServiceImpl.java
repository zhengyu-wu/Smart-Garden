package com.SmartGarden.SmartGarden.service.impl;


import com.SmartGarden.SmartGarden.model.HumiData;
import com.SmartGarden.SmartGarden.model.Sensor;
import com.SmartGarden.SmartGarden.repository.HumiRepository;
import com.SmartGarden.SmartGarden.service.HumiService;
import com.SmartGarden.SmartGarden.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class HumiServiceImpl implements HumiService {

    @Autowired
    private HumiRepository humiRepository;

    @Autowired
    private SensorService sensorService;


    @Override
    public boolean addHumiData(HumiData humiData,int sensorId) {
        try{
            Sensor tmpSensor=null;
            //先判断输入sensorId的有效性
            tmpSensor=sensorService.getSensorBySensorId(sensorId);
            if(tmpSensor==null)
                return false;
            humiData.setSendTime(new Date());
            humiData.setSensor(tmpSensor);
            humiRepository.save(humiData);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean deleteByHumiDataId(Integer humiDataId) {
        try {
            humiRepository.deleteById(humiDataId);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public List<HumiData> getLast20DataBySensorId(int sensorId) {
        return humiRepository.findTop20BySensor_SensorIdOrderBySendTimeDesc(sensorId);
    }

    @Override
    public List<HumiData> getLast15DataBySensorId(int sensorId) {
        return humiRepository.findTop15BySensor_SensorIdOrderBySendTimeDesc(sensorId);
    }

    @Override
    public List<HumiData> getLastHumiDataByGardenId(int gardenId) {
        List<Sensor> tmpSensorList=sensorService.getByGardenId(gardenId);
        List<HumiData> tmpList=new ArrayList<>();
        if(tmpSensorList==null)
            return null;
        else {
            for(Sensor tmpSensor:tmpSensorList){
                //忽略已经关闭的传感器的数据
                if(tmpSensor.getSensorState()==0){
                    continue;
                }
                HumiData tmpData=null;
                tmpData=humiRepository.findTopBySensor_SensorIdOrderBySendTimeDesc(tmpSensor.getSensorId());
                if(tmpData!=null)
                    tmpList.add(tmpData);
            }
        }

        return tmpList;
    }
}
