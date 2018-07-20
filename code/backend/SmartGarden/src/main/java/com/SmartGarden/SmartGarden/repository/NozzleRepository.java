package com.SmartGarden.SmartGarden.repository;


import com.SmartGarden.SmartGarden.model.Nozzle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NozzleRepository extends JpaRepository<Nozzle,Integer> {
    List<Nozzle> getByGarden_GardenId(int gardenId);
    Nozzle findByNozzleId(int nozzleId);
}
