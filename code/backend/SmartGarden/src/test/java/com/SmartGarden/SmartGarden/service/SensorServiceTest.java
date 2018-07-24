package com.SmartGarden.SmartGarden.service;

import com.SmartGarden.SmartGarden.model.Garden;
import com.SmartGarden.SmartGarden.model.Sensor;
import com.SmartGarden.SmartGarden.model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class SensorServiceTest {

    @Autowired
    UserService userService;

    @Autowired
    GardenService gardenService;

    @Autowired
    SensorService sensorService;

    private Garden testGarden;
    private User testUser;
    private Sensor testSensor;

    @BeforeEach
    void setUp() {
        assertNotNull(gardenService);
        assertNotNull(userService);
        testUser=new User();
        testUser.setUserState(0);
        testUser.setPassword("123");
        testUser.setEmail("qqq@s.com");
        testUser.setPhone("18322232423");
        testUser.setUsername("unitTest");
        testUser.setUserType(0);
        testUser.setUserId((userService.insert(testUser)).getUserId());
        testGarden=new Garden();
        testGarden.setUser(null);
        testGarden.setGardenName("test");
        testGarden.setLength(100);
        testGarden.setWidth(100);
        testGarden.setPositionX(0.0);
        testGarden.setPositionY(0.0);
        gardenService.addGardenWithUser(testGarden,testUser.getUserId());
        Garden tmpGarden=(gardenService.getGardenByUserId(testUser.getUserId())).get(0);
        assertNotNull(tmpGarden);
        testGarden.setGardenId(tmpGarden.getGardenId());
        testSensor=new Sensor();
        testSensor.setPositionY(5.0);
        testSensor.setPositionX(5.0);
        testSensor.setSensorState(1);
        testSensor.setGarden(testGarden);
        testSensor.setSensorType(1);
        sensorService.addSensorWithGardenId(testSensor,testGarden.getGardenId());
        testSensor.setSensorId(sensorService.getByGardenId(testGarden.getGardenId()).get(0).getSensorId());
    }

    @AfterEach
    void tearDown() {
        sensorService.deleteSensor(testSensor.getSensorId());
        gardenService.deleteByGardenId(testGarden.getGardenId());
        userService.delete(testUser.getUserId());
        testSensor=null;
        testGarden=null;
        testUser=null;
    }

    @Test
    void updateSensor() {
        Sensor tmpSensor=new Sensor();
        tmpSensor.setSensorId(testSensor.getSensorId());
        tmpSensor.setSensorType(2);
        tmpSensor.setGarden(testGarden);
        tmpSensor.setSensorState(0);
        tmpSensor.setPositionY(233.0);
        tmpSensor.setPositionX(testSensor.getPositionX());
        sensorService.updateSensor(tmpSensor);
        testSensor=sensorService.getSensorBySensorId(testSensor.getSensorId());
        assertEquals(233.0,(double)testSensor.getPositionY());
        assertEquals(tmpSensor.getPositionX(),testSensor.getPositionX());
        assertEquals(2,testSensor.getSensorType());
        assertEquals(0,testSensor.getSensorState());
    }

    @Test
    void changeSensorState() {
        sensorService.changeSensorState(testSensor.getSensorId(),0);
        testSensor=sensorService.getSensorBySensorId(testSensor.getSensorId());
        assertEquals(0,testSensor.getSensorState());
    }

    @Test
    void changeSensorPosition() {
        sensorService.changeSensorPosition(testSensor.getSensorId(),233.0,233.0);
        testSensor=sensorService.getSensorBySensorId(testSensor.getSensorId());
        assertEquals(233.0,(double)testSensor.getPositionX());
        assertEquals(233.0,(double)testSensor.getPositionY());
    }


    @Test
    void getByGardenId() {
        List<Sensor> tmpList=sensorService.getByGardenId(testGarden.getGardenId());
        assertEquals(testSensor.getSensorId(),tmpList.get(0).getSensorId());
    }

    @Test
    void getSensorNumberByGardenId() {
        int tmpNum=sensorService.getSensorNumberByGardenId(testGarden.getGardenId());
        assertEquals(1,(int)tmpNum);
    }
}