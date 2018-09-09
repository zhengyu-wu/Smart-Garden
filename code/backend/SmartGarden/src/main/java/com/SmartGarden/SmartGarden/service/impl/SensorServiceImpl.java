package com.SmartGarden.SmartGarden.service.impl;

import com.SmartGarden.SmartGarden.model.Garden;
import com.SmartGarden.SmartGarden.model.Sensor;
import com.SmartGarden.SmartGarden.repository.SensorRepository;
import com.SmartGarden.SmartGarden.service.GardenService;
import com.SmartGarden.SmartGarden.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SensorServiceImpl implements SensorService {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private GardenService gardenService;

    @Override
    public boolean addSensor(Sensor sensor) {

        try {
            sensorRepository.save(sensor);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean addSensorWithGardenId(Sensor sensor, int gardenId) {
        //先判断输入gardenId的有效性
        Garden tmpGarden=gardenService.getGardenByGardenId(gardenId);
        if (tmpGarden==null)
            return false;
        sensor.setGarden(tmpGarden);
        try {
            sensorRepository.save(sensor);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean deleteSensor(int sensorId) {
        try {
            sensorRepository.deleteById(sensorId);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean updateSensor(Sensor sensor) {
        try{
            if(sensor.getSensorId()==null)
                return false;
            Sensor tmpSensor=sensorRepository.findBySensorId(sensor.getSensorId());
            if(tmpSensor==null)
                return false;
            sensorRepository.save(sensor);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    @Override
    public boolean changeSensorState(int sensorId, int sensorState) {

        try{
            Sensor tmpSensor=getSensorBySensorId(sensorId);
            if(tmpSensor==null)
                return false;
            else {
                tmpSensor.setSensorState(sensorState);
                sensorRepository.save(tmpSensor);
                return true;
            }
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean changeSensorPosition(int sensorId, Double positionX, Double positionY) {
        try {
            Sensor tmpSensor = getSensorBySensorId(sensorId);
            if (tmpSensor == null)
                return false;
            else {
                tmpSensor.setPositionX(positionX);
                tmpSensor.setPositionY(positionY);
                sensorRepository.save(tmpSensor);
                return true;
            }
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Sensor getSensorBySensorId(int sensorId) {
        return sensorRepository.findBySensorId(sensorId);
    }

    @Override
    public List<Sensor> getAllSensor() {
        return sensorRepository.findAll();
    }

    @Override
    public List<Sensor> getByGardenId(int gardenId) {
        return sensorRepository.getByGarden_GardenId(gardenId);
    }

    @Override
    public List<Sensor> getHumiSensorByGardenId(int gardenId) {
        List<Sensor> resList=new ArrayList<>();
        List<Sensor> tmpList=sensorRepository.getByGarden_GardenId(gardenId);
        for (Sensor aTmpList : tmpList) {
            if (aTmpList.getSensorType() == 1) {
                resList.add(aTmpList);
            }
        }
        return resList;
    }

    @Override
    public List<Sensor> getTempSensorByGardenId(int gardenId) {
        List<Sensor> resList=new ArrayList<>();
        List<Sensor> tmpList=sensorRepository.getByGarden_GardenId(gardenId);
        for (Sensor aTmpList : tmpList) {
            if (aTmpList.getSensorType() == 2) {
                resList.add(aTmpList);
            }
        }
        return resList;
    }

    @Override
    public int getSensorNumberByGardenId(int gardenId) {
        return sensorRepository.countByGarden_GardenId(gardenId);
    }
}
