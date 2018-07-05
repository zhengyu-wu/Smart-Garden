package com.SmartGarden.SmartGarden.repository;

import com.SmartGarden.SmartGarden.model.HumiData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HumiRepository extends JpaRepository<HumiData,Integer> {
}
