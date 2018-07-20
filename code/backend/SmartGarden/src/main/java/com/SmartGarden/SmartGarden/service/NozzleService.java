package com.SmartGarden.SmartGarden.service;

import com.SmartGarden.SmartGarden.model.Nozzle;

import java.util.List;

public interface NozzleService {
    Nozzle addNozzleWithGardenId(Nozzle nozzle,int gardenId);
    boolean deleteByNozzleId(int nozzleId);
    List<Nozzle> getByGardenId(int gardenId);
    boolean modifyRadius(int nozzleId,Double radius);
    boolean modifyState(int nozzleId,int state);
    Nozzle getByNozzleId(int nozzleId);
}
