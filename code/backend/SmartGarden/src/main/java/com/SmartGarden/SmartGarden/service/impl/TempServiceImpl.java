package com.SmartGarden.SmartGarden.service.impl;


import com.SmartGarden.SmartGarden.model.Sensor;
import com.SmartGarden.SmartGarden.model.TempData;
import com.SmartGarden.SmartGarden.repository.TempRepository;
import com.SmartGarden.SmartGarden.service.SensorService;
import com.SmartGarden.SmartGarden.service.TempService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TempServiceImpl implements TempService {

    @Autowired
    private TempRepository tempRepository;

    @Autowired
    private SensorService sensorService;

    @Override
    public boolean addTempData(TempData tempData,int sensorId) {
        try {
            //先查看是否有对应的sensor
            Sensor tmpSensor=sensorService.getSensorBySensorId(sensorId);
            if(tmpSensor==null)
                return false;
            tempData.setSensor(tmpSensor);
            tempData.setSendTime(new Date());
            tempRepository.save(tempData);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean deleteByTempDataId(Integer tempDataId) {
        try {
            tempRepository.deleteById(tempDataId);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public List<TempData> getLast20DataBySensorId(int sensorId) {
        return tempRepository.findTop20BySensor_SensorIdOrderBySendTimeDesc(sensorId);
    }

    @Override
    public List<TempData> getLast15DataBySensorId(int sensorId) {
        return tempRepository.findTop15BySensor_SensorIdOrderBySendTimeDesc(sensorId);
    }

    @Override
    public List<TempData> getLastTempDataByGardenId(int gardenId) {
        List<Sensor> tmpSensorList=sensorService.getByGardenId(gardenId);
        List<TempData> tmpList= new ArrayList<>();
        if(tmpSensorList==null)
            return null;
        else{
            //遍历list
            for(Sensor tmpSensor : tmpSensorList){
                TempData tmpData=null;
                //忽略已经关闭的传感器的数据
                if(tmpSensor.getSensorState()==0){
                    continue;
                }
                tmpData=tempRepository.findTopBySensor_SensorIdOrderBySendTimeDesc(tmpSensor.getSensorId());
                if(tmpData!=null)
                    tmpList.add(tmpData);
            }
        }
        return tmpList;
    }
}
