package com.SmartGarden.SmartGarden.service;

import com.SmartGarden.SmartGarden.model.Sensor;

import java.util.List;

public interface SensorService {
    boolean addSensor(Sensor sensor);
    boolean addSensorWithGardenId(Sensor sensor,int gardenId);
    boolean deleteSensor(int sensorId);
    boolean updateSensor(Sensor sensor);
    boolean changeSensorState(int sensorId,int sensorState);
    boolean changeSensorPosition(int sensorId,Double positionX,Double positionY);
    Sensor getSensorBySensorId(int sensorId);
    List<Sensor> getAllSensor();
    List<Sensor> getByGardenId(int gardenId);
    int getSensorNumberByGardenId(int gardenId);
}
