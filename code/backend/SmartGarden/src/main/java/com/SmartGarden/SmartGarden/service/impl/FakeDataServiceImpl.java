package com.SmartGarden.SmartGarden.service.impl;

import com.SmartGarden.SmartGarden.model.*;
import com.SmartGarden.SmartGarden.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/*
* 说明：此功能仅供测试使用，使用前请保证gardenId中Id为6的无对应的sensor
* 生成数据：指定gardenId为6，其属于userId为1的用户
* 步骤：
* 1.先拿到对应garden的十个温度传感器，十个湿度传感器，加入sensors中
* 2.先对每个温度传感器设置初始值25℃，每个湿度传感器设置初始值0.3
* 3.每30s，对于每个温度传感器，温度产生1℃内的温差（上限不超过50℃，下限不低于10℃），
* 对于每个湿度传感器，湿度产生3%以内的湿度差（上限不超过90%，下限不低于10%）
* */

//todo 编译报错。。。


@Service
public class FakeDataServiceImpl implements FakeDataService {

    @Autowired
    HumiService humiService;

    @Autowired
    TempService tempService;

    @Autowired
    GardenService gardenService;

    @Autowired
    SensorService sensorService;

    @Autowired
    UserService userService;

    @Autowired
    NozzleService nozzleService;

    private static final int GARDEN_ID = 6;
    private static final long SECOND=1*1000;
    private static Double [] temps={25.0,25.0,25.0,25.0,25.0,25.0,25.0,25.0,25.0,25.0};
    private static Double [] humis={0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3};
    private List<Sensor> humiSensors;
    private List<Sensor> tempSensors;

    @Override
    public void generateData() throws InterruptedException {
        humiSensors=sensorService.getHumiSensorByGardenId(GARDEN_ID);
        tempSensors=sensorService.getTempSensorByGardenId(GARDEN_ID);
        for(int i=0;i<10;i++){
            Double deltaTemp=Math.random();
            Double deltaHumi=Math.random()*0.03;
            System.out.println("deltaTemp: "+deltaTemp);
            System.out.println("deltaHumi: "+deltaHumi);
            boolean addDelta= Math.random() > 0.5;
            if(addDelta){
                if(temps[i]+deltaTemp<50.0){
                    System.out.println("temps origin"+i+": "+temps[i]);
                    temps[i]+=deltaTemp;
                    System.out.println("temps"+i+": "+temps[i]);
                }
                else {
                    temps[i]-=deltaTemp;
                    System.out.println("temps"+i+": "+temps[i]);
                }
                if(humis[i]+deltaHumi<0.9){
                    humis[i]+=deltaHumi;
                    System.out.println("humis"+i+": "+humis[i]);
                }
                else {
                    humis[i]-=deltaHumi;
                    System.out.println("temps"+i+": "+temps[i]);

                }
            }
            else {
                if(temps[i]-deltaTemp>10.0){
                    temps[i]-=deltaTemp;
                    System.out.println("temps"+i+": "+temps[i]);
                }
                else {
                    temps[i]+=deltaTemp;
                    System.out.println("temps"+i+": "+temps[i]);
                }
                if(humis[i]-deltaHumi>0.1){
                    humis[i]-=deltaHumi;
                    System.out.println("temps"+i+": "+temps[i]);
                }
                else {
                    humis[i]+=deltaHumi;
                    System.out.println("temps"+i+": "+temps[i]);
                }
            }
        }

        for(int i=0;i<10;i++){
            HumiData tmpHumiData=new HumiData();
            tmpHumiData.setSendTime(new Date());
            tmpHumiData.setSensor(humiSensors.get(i));
            tmpHumiData.setHumidity(humis[i]);
            tmpHumiData.setPositionX(humiSensors.get(i).getPositionX());
            tmpHumiData.setPositionY(humiSensors.get(i).getPositionY());
            humiService.addHumiData(tmpHumiData,humiSensors.get(i).getSensorId());
            TempData tmpTempData=new TempData();
            Thread.currentThread().sleep(500);
            tmpTempData.setSendTime(new Date());
            tmpTempData.setSensor(tempSensors.get(i));
            tmpTempData.setTemperature(temps[i]);
            tmpTempData.setPositionX(tempSensors.get(i).getPositionX());
            tmpTempData.setPositionY(tempSensors.get(i).getPositionY());
            tempService.addTempData(tmpTempData,tempSensors.get(i).getSensorId());
        }

    }

    @Override
    public void generateDataWithSensorId(int sensorId) throws InterruptedException {
        Sensor tmpSensor=sensorService.getSensorBySensorId(sensorId);

        if(tmpSensor==null)
            return;
        int type=tmpSensor.getSensorType();
        for(int i=0;i<10;i++){
            Double deltaTemp=Math.random();
            Double deltaHumi=Math.random()*0.03;
            boolean addDelta= Math.random() > 0.5;
            if(addDelta){
                if(type==2){
                    if(temps[0]+deltaTemp<50.0){
                        temps[0]+=deltaTemp;
                    }
                    else {
                        temps[0]-=deltaTemp;
                    }
                }
                else {
                    if(humis[0]+deltaHumi<0.9){
                        humis[0]+=deltaHumi;
                    }
                    else {
                        humis[0]-=deltaHumi;
                    }
                }
            }
            else {
                if(type==2){
                    if(temps[0]-deltaTemp>10.0){
                        temps[0]-=deltaTemp;
                    }
                    else {
                        temps[0]+=deltaTemp;
                    }
                }
                else{
                    if(humis[0]-deltaHumi>0.1){
                        humis[0]-=deltaHumi;
                    }
                    else {
                        humis[0]+=deltaHumi;
                    }
                }
            }
            //
            Thread.currentThread().sleep(1000);
            if(type==1){
                HumiData tmpHumiData=new HumiData();
                tmpHumiData.setSendTime(new Date());
                tmpHumiData.setSensor(tmpSensor);
                tmpHumiData.setHumidity(humis[0]);
                System.out.println("humi 0 "+humis[0]);
                tmpHumiData.setPositionX(tmpSensor.getPositionX());
                tmpHumiData.setPositionY(tmpSensor.getPositionY());
                humiService.addHumiData(tmpHumiData,sensorId);
            }
            else{
                TempData tmpTempData=new TempData();
                tmpTempData.setSendTime(new Date());
                tmpTempData.setSensor(tmpSensor);
                tmpTempData.setTemperature(temps[0]);
                System.out.println("temp 0 "+temps[0]);
                tmpTempData.setPositionX(tmpSensor.getPositionX());
                tmpTempData.setPositionY(tmpSensor.getPositionY());
                tempService.addTempData(tmpTempData,sensorId);
            }
        }

    }

    @Override
    public void generateDataWithGardenId(int gardenId) {
        List<Sensor> gardenSensor=sensorService.getByGardenId(gardenId);
        if(gardenSensor==null||gardenSensor.size()==0){
            return;
        }
        List<TempData> tempDataList=tempService.getLastTempDataByGardenId(gardenId);
        List<HumiData> humiDataList=humiService.getLastHumiDataByGardenId(gardenId);
        if(tempDataList==null||tempDataList.size()==0){
            //生成第一组温度数据
            for (Sensor tmpSensor:gardenSensor
                 ) {
                System.out.println("gardenSensor: "+tmpSensor.getSensorId()+" sensorType: "+tmpSensor.getSensorType());
                if(tmpSensor.getSensorType()==2){
                    System.out.println("target sensor: "+tmpSensor.getSensorId());
                    Double temp=Math.random()*20+20;
                    TempData tmpTempData=new TempData();
                    tmpTempData.setSendTime(new Date());
                    tmpTempData.setSensor(tmpSensor);
                    tmpTempData.setTemperature(temp);
                    tmpTempData.setPositionX(tmpSensor.getPositionX());
                    tmpTempData.setPositionY(tmpSensor.getPositionY());
                    tempService.addTempData(tmpTempData,tmpSensor.getSensorId());
                }
            }
        }
        else {
            for (TempData tmpTemp:tempDataList
                 ) {
                Double deltaTemp=Math.random()*3;
                if(Math.random()>0.5) deltaTemp=-deltaTemp;
                TempData tmpTempData=new TempData();
                tmpTempData.setSendTime(new Date());
                tmpTempData.setSensor(tmpTemp.getSensor());
                if(tmpTemp.getTemperature()+deltaTemp>45||tmpTemp.getTemperature()+deltaTemp<15){
                    deltaTemp=-deltaTemp;
                }
                tmpTempData.setTemperature(tmpTemp.getTemperature()+deltaTemp);
                tmpTempData.setPositionX(tmpTemp.getPositionX());
                tmpTempData.setPositionY(tmpTemp.getPositionY());
                tempService.addTempData(tmpTempData,tmpTemp.getSensor().getSensorId());
            }
        }

        if(humiDataList==null||humiDataList.size()==0){
            for (Sensor tmpSensor:gardenSensor
                    ) {
                if(tmpSensor.getSensorType()==1){
                    Double temp=Math.random()*0.5+0.1;
                    HumiData tmpHumiData=new HumiData();
                    tmpHumiData.setSendTime(new Date());
                    tmpHumiData.setSensor(tmpSensor);
                    tmpHumiData.setHumidity(temp);
                    tmpHumiData.setPositionX(tmpSensor.getPositionX());
                    tmpHumiData.setPositionY(tmpSensor.getPositionY());
                    humiService.addHumiData(tmpHumiData,tmpSensor.getSensorId());
                }
            }
        }
        else{
            for(HumiData tmpHumi:humiDataList){
                Double deltaHumi=Math.random()*0.05;
                if(Math.random()>0.5)
                    deltaHumi=-deltaHumi;
                HumiData tmpHumiData=new HumiData();
                tmpHumiData.setSendTime(new Date());
                tmpHumiData.setSensor(tmpHumi.getSensor());
                if(tmpHumi.getHumidity()+deltaHumi>0.9||tmpHumi.getHumidity()+deltaHumi<0.1){
                    deltaHumi=-deltaHumi;
                }
                tmpHumiData.setHumidity(tmpHumi.getHumidity()+deltaHumi);
                tmpHumiData.setPositionX(tmpHumi.getPositionX());
                tmpHumiData.setPositionY(tmpHumi.getPositionY());
                humiService.addHumiData(tmpHumiData,tmpHumi.getSensor().getSensorId());
            }
        }
    }

    @Override
    public void generateAll() throws InterruptedException {
        User testUser = new User();
        testUser.setUserState(0);
        testUser.setPassword("123");
        testUser.setEmail("qwq@s.com");
        testUser.setPhone("18322232423");
        testUser.setUsername("unitTest");
        testUser.setUserType(0);
        testUser.setUserId((userService.insert(testUser)).getUserId());
        if(testUser.getUserId()==null)
            return;
        Garden testGarden=new Garden();
        testGarden.setUser(null);
        testGarden.setGardenName("test");
        testGarden.setLength(100);
        testGarden.setWidth(100);
        testGarden.setPositionX(0.0);
        testGarden.setPositionY(0.0);
        gardenService.addGardenWithUser(testGarden,testUser.getUserId());
        Garden tmpGarden=(gardenService.getGardenByUserId(testUser.getUserId())).get(0);
        testGarden.setGardenId(tmpGarden.getGardenId());
        for(int i=0;i<50;i++){
            Sensor tempSensor=new Sensor();
            Sensor humiSensor=new Sensor();
            Nozzle nozzle=new Nozzle();
            tempSensor.setPositionY(Math.random()*100);
            tempSensor.setPositionX(Math.random()*100);
            tempSensor.setSensorState(1);
            tempSensor.setGarden(testGarden);
            tempSensor.setSensorType(2);
            humiSensor.setPositionY(Math.random()*100);
            humiSensor.setPositionX(Math.random()*100);
            humiSensor.setGarden(testGarden);
            humiSensor.setSensorType(1);
            humiSensor.setSensorState(1);
            nozzle.setPositionX(Math.random()*100);
            nozzle.setPositionY(Math.random()*100);
            nozzle.setNozzleState(Math.random()>0.5?0:1);
            nozzle.setGarden(testGarden);
            nozzle.setRadius(Math.random()*5+1);
            nozzleService.addNozzleWithGardenId(nozzle,testGarden.getGardenId());
            sensorService.addSensorWithGardenId(tempSensor,testGarden.getGardenId());
            sensorService.addSensorWithGardenId(humiSensor,testGarden.getGardenId());
        }

        for(int i=0;i<50;i++){
            generateDataWithGardenId(testGarden.getGardenId());
            Thread.currentThread().sleep(1000);
        }
    }

}

