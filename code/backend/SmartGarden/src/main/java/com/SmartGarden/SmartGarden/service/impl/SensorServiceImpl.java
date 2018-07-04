package com.SmartGarden.SmartGarden.service.impl;

import com.SmartGarden.SmartGarden.model.Sensor;
import com.SmartGarden.SmartGarden.repository.SensorRepository;
import com.SmartGarden.SmartGarden.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SensorServiceImpl implements SensorService {

    @Autowired
    private SensorRepository sensorRepository;

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
    public Sensor getSensorBySensorId(int sensorId) {
        return sensorRepository.findBySensorId(sensorId);
    }

    @Override
    public List<Sensor> getAllSensor() {
        return sensorRepository.findAll();
    }
}
