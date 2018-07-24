package com.SmartGarden.SmartGarden.service;

import com.SmartGarden.SmartGarden.model.Garden;
import com.SmartGarden.SmartGarden.model.Nozzle;
import com.SmartGarden.SmartGarden.model.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class NozzleServiceTest {

    @Autowired
    UserService userService;

    @Autowired
    GardenService gardenService;

    @Autowired
    NozzleService nozzleService;

    private Garden testGarden;
    private User testUser;
    private Nozzle testNozzle;


    @BeforeEach
    void setUp() {
        assertNotNull(gardenService);
        assertNotNull(userService);
        testUser=new User();
        testUser.setUserState(0);
        testUser.setPassword("123");
        testUser.setEmail("qaq@s.com");
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
        testNozzle=new Nozzle();
        testNozzle.setPositionY(2.0);
        testNozzle.setPositionX(2.0);
        testNozzle.setNozzleState(0);
        testNozzle.setRadius(2.0);
        testNozzle.setGarden(testGarden);
        nozzleService.addNozzleWithGardenId(testNozzle,testGarden.getGardenId());
        testNozzle.setNozzleId(nozzleService.getByGardenId(testGarden.getGardenId()).get(0).getNozzleId());
    }

    @AfterEach
    void tearDown() {
        nozzleService.deleteByNozzleId(testNozzle.getNozzleId());
        gardenService.deleteByGardenId(testGarden.getGardenId());
        userService.delete(testUser.getUserId());
        testNozzle=null;
        testGarden=null;
        testUser=null;
    }

    @Test
    void modifyRadius() {
        nozzleService.modifyRadius(testNozzle.getNozzleId(),2.33);
        testNozzle=nozzleService.getByNozzleId(testNozzle.getNozzleId());
        assertEquals(2.33,(double)testNozzle.getRadius());

    }

    @Test
    void modifyState() {
        nozzleService.modifyState(testNozzle.getNozzleId(),1);
        testNozzle=nozzleService.getByNozzleId(testNozzle.getNozzleId());
        assertEquals(1,testNozzle.getNozzleState());
    }

    @Test
    void modifyPosition() {
        nozzleService.modifyPosition(testNozzle.getNozzleId(),2.33,2.33);
        testNozzle=nozzleService.getByNozzleId(testNozzle.getNozzleId());
        assertEquals(2.33,(double)testNozzle.getPositionX());
        assertEquals(2.33,(double)testNozzle.getPositionY());
    }

}