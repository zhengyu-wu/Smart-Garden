package com.SmartGarden.SmartGarden.repository;

import com.SmartGarden.SmartGarden.model.WateringConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WateringConfigRepository extends JpaRepository<WateringConfig,Integer> {
    List<WateringConfig> findByGarden_GardenId(int gardenId);
    WateringConfig findByConfigId(int configId);
    List<WateringConfig> findAll();

}
