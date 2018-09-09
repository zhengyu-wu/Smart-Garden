package com.SmartGarden.SmartGarden.repository;


import com.SmartGarden.SmartGarden.model.TempData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//采用SpringData JPA的命名方法自动生成函数实现
@Repository
public interface TempRepository extends JpaRepository<TempData,Integer> {
    List<TempData> findTop20BySensor_SensorIdOrderBySendTimeDesc(int sensorId);
    List<TempData> findTop15BySensor_SensorIdOrderBySendTimeDesc(int sensorId);
    TempData findTopBySensor_SensorIdOrderBySendTimeDesc(int sensorId);
}
