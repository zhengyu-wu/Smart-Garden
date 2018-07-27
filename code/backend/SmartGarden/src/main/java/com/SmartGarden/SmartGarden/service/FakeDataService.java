package com.SmartGarden.SmartGarden.service;

public interface FakeDataService {
    void generateData() throws InterruptedException;
    void generateDataWithSensorId(int sensorId) throws InterruptedException;
    void generateDataWithGardenId(int gardenId);
    void generateAll() throws InterruptedException;
}
