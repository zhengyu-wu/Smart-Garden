package com.SmartGarden.SmartGarden.controller;


import com.SmartGarden.SmartGarden.service.FakeDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/fakeData")
public class FakeDataController {

    @Autowired
    private FakeDataService fakeDataService;

    @ResponseBody
    @GetMapping("/generateData")
    public void generateData(){
        try{
            fakeDataService.generateData();
        }
        catch (Exception e){
            return;
        }
    }

    @ResponseBody
    @GetMapping("/generateDataWithSensorId")
    public void generateDataWithSensorId(int sensorId){
        try {
            fakeDataService.generateDataWithSensorId(sensorId);
        }
        catch (Exception e){
            return;
        }
    }
    @ResponseBody
    @GetMapping("/generateDataWithGardenId")
    public void generateDataWithGardenId(int gardenId){
        fakeDataService.generateDataWithGardenId(gardenId);
    }


    /*
    *生成一个新的花园和用户，生成50个温度传感器，湿度传感器和nozzle，生成一次数据
    * 注意此接口被重复调用没有效果，因为重复的user email会阻止加入新的用户导致失败
     */
    @ResponseBody
    @GetMapping("/generateAll")
    public void generateAll() throws InterruptedException {
        fakeDataService.generateAll();
    }
}
