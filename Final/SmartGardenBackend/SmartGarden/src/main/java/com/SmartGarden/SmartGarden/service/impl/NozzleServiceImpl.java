package com.SmartGarden.SmartGarden.service.impl;

import com.SmartGarden.SmartGarden.model.Garden;
import com.SmartGarden.SmartGarden.model.Nozzle;
import com.SmartGarden.SmartGarden.repository.NozzleRepository;
import com.SmartGarden.SmartGarden.service.GardenService;
import com.SmartGarden.SmartGarden.service.NozzleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NozzleServiceImpl implements NozzleService {

    @Autowired
    NozzleRepository nozzleRepository;

    @Autowired
    private GardenService gardenService;

    @Override
    public Nozzle addNozzleWithGardenId(Nozzle nozzle, int gardenId) {
        //先判断输入gardenId的有效性
        Garden tmpGarden=gardenService.getGardenByGardenId(gardenId);
        if(tmpGarden==null)
            return null;
        nozzle.setGarden(tmpGarden);
        try {
            nozzleRepository.save(nozzle);
            return nozzle;
        }
        catch (Exception e){
            return null;
        }
    }

    @Override
    public boolean deleteByNozzleId(int nozzleId) {
        try {
            nozzleRepository.deleteById(nozzleId);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public List<Nozzle> getByGardenId(int gardenId) {
        return nozzleRepository.getByGarden_GardenId(gardenId);
    }

    @Override
    public boolean modifyRadius(int nozzleId, Double radius) {
        try {
            Nozzle tmpNozzle=nozzleRepository.findByNozzleId(nozzleId);
            if(tmpNozzle==null)
                return false;
            tmpNozzle.setRadius(radius);
            nozzleRepository.save(tmpNozzle);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean modifyState(int nozzleId, int state) {
        try {
            Nozzle tmpNozzle=nozzleRepository.findByNozzleId(nozzleId);
            if(tmpNozzle==null)
                return false;
            if(state==1)
                tmpNozzle.setNozzleState(tmpNozzle.getNozzleState()+1);
            else if(state==0)
            {
                tmpNozzle.setNozzleState(0);
            }
            else return false;
            nozzleRepository.save(tmpNozzle);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean modifyPosition(int nozzleId, Double positionX,Double positionY) {
        try {
            Nozzle tmpNozzle=nozzleRepository.findByNozzleId(nozzleId);
            if(tmpNozzle==null)
                return false;
            tmpNozzle.setPositionX(positionX);
            tmpNozzle.setPositionY(positionY);
            nozzleRepository.save(tmpNozzle);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public Nozzle getByNozzleId(int nozzleId) {
        return nozzleRepository.findByNozzleId(nozzleId);
    }

    @Override
    public List<Nozzle> getWorkingNozzleByGardenId(int gardenId) {
        List<Nozzle> tmpList=nozzleRepository.getByGarden_GardenId(gardenId);
        if(tmpList.size()==0) return null;
        List<Nozzle> resList=new ArrayList<>();
        for (Nozzle tmpNozzle:tmpList
             ) {
            if(tmpNozzle.getNozzleState()!=0){
                resList.add(tmpNozzle);
            }
        }
        return resList;
    }
}
