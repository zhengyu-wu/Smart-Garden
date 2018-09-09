package com.SmartGarden.SmartGarden.service.impl;

import com.SmartGarden.SmartGarden.model.*;
import com.SmartGarden.SmartGarden.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WateringServiceImpl implements WateringService {

    @Autowired
    private WateringConfigService wateringConfigService;

    @Autowired
    private TempService tempService;

    @Autowired
    private HumiService humiService;

    @Autowired
    private SensorService sensorService;

    @Autowired
    private NozzleService nozzleService;

    @Autowired
    private GardenService gardenService;


    @Override
    public void autoWatering() {

        List<WateringConfig> wateringConfigList=wateringConfigService.getAllConfig();
        if(wateringConfigList.size()==0)
            return;
        for (WateringConfig tmpConfig:wateringConfigList
             ) {
            int tmpGardenId=tmpConfig.getGarden().getGardenId();
            Double bestTempMax=tmpConfig.getBestTempMax();
            Double bestTempMin=tmpConfig.getBestTempMin();
            Double bestHumiMax=tmpConfig.getBestHumiMax();
            Double bestHumiMin=tmpConfig.getBestHumiMin();

            //step1 获取花园的最近的温度和湿度数据
            List<TempData> tempDataList=tempService.getLastTempDataByGardenId(tmpGardenId);
            List<HumiData> humiDataList=humiService.getLastHumiDataByGardenId(tmpGardenId);
            //step2 判断是否超过了上限
            List<TempData> todoTempList=new ArrayList<>();
            List<HumiData> todoHumiList=new ArrayList<>();
            List<Nozzle> todoNozzleList=new ArrayList<>();
            List<Nozzle> toTurnOffList=new ArrayList<>();
            List<Nozzle> allNozzle=nozzleService.getByGardenId(tmpGardenId);
            List<Nozzle> allWorkingNozzle=nozzleService.getWorkingNozzleByGardenId(tmpGardenId);
            if(allNozzle.size()==0)
                return;
            //step3 对于发现超过上限的点 查找最近的nozzle并加入todolist，其余的加入keepList
            for (TempData tmpTemp:tempDataList
                 ) {
                if(tmpTemp.getTemperature()>bestTempMax){
                    todoTempList.add(tmpTemp);
                }
            }
            for(HumiData tmpHumi:humiDataList){
                if(tmpHumi.getHumidity()<bestHumiMin){
                    todoHumiList.add(tmpHumi);
                }
            }
            //查找算法先采用简单遍历
            for (TempData tmpTemp:todoTempList
                 ) {
                Nozzle targetNozzle=null;
                Double minDistance=2333333333333.0;
                Double tempPosX=tmpTemp.getPositionX();
                Double tempPosY=tmpTemp.getPositionY();
                for (Nozzle tmpNozzle:allNozzle){
                    Double nozzlePosX=tmpNozzle.getPositionX();
                    Double nozzlePosY=tmpNozzle.getPositionY();
                    Double distance=Math.sqrt((nozzlePosX-tempPosX)*(nozzlePosX-tempPosX)+(nozzlePosY-tempPosY)*(nozzlePosY-tempPosY));
                    if(distance<minDistance){
                        minDistance=distance;
                        targetNozzle=tmpNozzle;
                    }
                }
                System.out.println("for target temp: heat: "+tmpTemp.getTemperature()+" pos:"
                        +"("+tmpTemp.getPositionX()+","+tmpTemp.getPositionY()+")");
                System.out.println("choose a nozzle: "+targetNozzle.getNozzleId()+" pos: ("+targetNozzle.getPositionX()
                +","+targetNozzle.getPositionY()+")");
                todoNozzleList.add(targetNozzle);
            }

            for(HumiData tmpHumi:todoHumiList){
                Nozzle targetNozzle=null;
                Double minDistance=23333333333333.0;
                Double humiPositionX=tmpHumi.getPositionX();
                Double humiPositionY=tmpHumi.getPositionY();
                for (Nozzle tmpNozzle:allNozzle){
                    Double nozzlePosX=tmpNozzle.getPositionX();
                    Double nozzlePosY=tmpNozzle.getPositionY();
                    Double distance=Math.sqrt((nozzlePosX-humiPositionX)*(nozzlePosX-humiPositionX)+(nozzlePosY-humiPositionY)*(nozzlePosY-humiPositionY));
                    if(distance<minDistance){
                        minDistance=distance;
                        targetNozzle=tmpNozzle;
                    }
                }
                System.out.println("for target humi: humidity: "+tmpHumi.getHumidity()+" pos:"
                        +"("+tmpHumi.getPositionX()+","+tmpHumi.getPositionY()+")");
                System.out.println("choose a nozzle: "+targetNozzle.getNozzleId()+" pos: ("+targetNozzle.getPositionX()
                        +","+targetNozzle.getPositionY()+")");
                todoNozzleList.add(targetNozzle);
            }

            //step4 对于todolist的nozzle，state++，对于keepList的nozzle，state--
            for (Nozzle tmpNozzle:allWorkingNozzle
                 ) {
                if(!todoNozzleList.contains(tmpNozzle)){
                    toTurnOffList.add(tmpNozzle);
                }
            }

            for (Nozzle tmpNozzle:todoNozzleList
                 ) {
                System.out.println("turn on nozzle: "+tmpNozzle.getNozzleId()+" position: ("+tmpNozzle.getPositionX()+","
                +tmpNozzle.getPositionY()+")");
                nozzleService.modifyState(tmpNozzle.getNozzleId(),1);
            }
            for(Nozzle tmpNozzle:toTurnOffList){
                System.out.println("turn off nozzle: "+tmpNozzle.getNozzleId()+" position: ("+tmpNozzle.getPositionX()+","
                        +tmpNozzle.getPositionY()+")");
                nozzleService.modifyState(tmpNozzle.getNozzleId(),0);
            }

        }
    }
}
