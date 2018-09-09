package com.SmartGarden.SmartGarden.repository;


import com.SmartGarden.SmartGarden.model.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//采用SpringData JPA的命名方法自动生成函数实现
@Repository
public interface SensorRepository extends JpaRepository<Sensor,Integer> {

    Sensor findBySensorId(int sensorId);
    List<Sensor> getByGarden_GardenId(int gardenId);
    int countByGarden_GardenId(int gardenId);
}
