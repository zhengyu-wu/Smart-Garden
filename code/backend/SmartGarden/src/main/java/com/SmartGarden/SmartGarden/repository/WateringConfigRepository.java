package com.SmartGarden.SmartGarden.repository;

import com.SmartGarden.SmartGarden.model.WateringConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//采用SpringData JPA的命名方法自动生成函数实现
@Repository
public interface WateringConfigRepository extends JpaRepository<WateringConfig,Integer> {
    List<WateringConfig> findByGarden_GardenId(int gardenId);
    WateringConfig findByConfigId(int configId);
    List<WateringConfig> findAll();

}
