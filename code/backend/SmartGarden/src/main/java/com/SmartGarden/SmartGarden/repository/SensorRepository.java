package com.SmartGarden.SmartGarden.repository;


import com.SmartGarden.SmartGarden.model.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SensorRepository extends JpaRepository<Sensor,Integer> {

    Sensor findBySensorId(int sensorId);
}
