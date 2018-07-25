package com.SmartGarden.SmartGarden.service;

import com.SmartGarden.SmartGarden.model.Garden;
import com.SmartGarden.SmartGarden.model.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(SpringExtension.class)
@SpringBootTest
class GardenServiceTest {

    @Autowired
    private GardenService gardenService;

    @Autowired
    private UserService userService;

    private Garden testGarden;
    private User testUser;

    @org.junit.jupiter.api.BeforeEach
    void setUp(){
        assertNotNull(gardenService);
        assertNotNull(userService);
        testUser=new User();
        testUser.setUserState(0);
        testUser.setPassword("123");
        testUser.setEmail("qwq@s.com");
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
    }

    @org.junit.jupiter.api.AfterEach
    void tearDown() {
        gardenService.deleteByGardenId(testGarden.getGardenId());
        userService.delete(testUser.getUserId());
        testGarden=null;
        testUser=null;
    }

    @Test
    void getGardenByUserId() {
        List<Garden> tmpGarden=gardenService.getGardenByUserId(testUser.getUserId());
        assertEquals(testGarden.getGardenId(),(tmpGarden.get(0)).getGardenId());
    }

    @Test
    void deleteByGardenId() {
        assertTrue(gardenService.deleteByGardenId(testGarden.getGardenId()));
        assertNull(gardenService.getGardenByGardenId(testGarden.getGardenId()));
        assertFalse(gardenService.deleteByGardenId(testGarden.getGardenId()));
    }

    @Test
    void deleteByUserId() {
        assertTrue(gardenService.deleteByUserId(testUser.getUserId()));
        assertEquals(0,gardenService.getGardenByUserId(testUser.getUserId()).size());
    }

    @Test
    void addGardenWithUser() {
        Garden tmpGarden=new Garden();
        tmpGarden.setUser(testUser);
        tmpGarden.setGardenName("test");
        tmpGarden.setLength(102);
        tmpGarden.setWidth(102);
        tmpGarden.setPositionX(1.0);
        tmpGarden.setPositionY(1.0);
        tmpGarden.setGardenId(gardenService.addGardenWithUserId(tmpGarden,testUser.getUserId()).getGardenId());
        assertEquals("test",(gardenService.getGardenByGardenId(tmpGarden.getGardenId())).getGardenName());
    }

    @Test
    void update() {
        Garden tmpGarden=new Garden();
        tmpGarden.setUser(testUser);
        tmpGarden.setGardenName("test");
        tmpGarden.setLength(102);
        tmpGarden.setWidth(102);
        tmpGarden.setPositionX(1.0);
        tmpGarden.setPositionY(1.0);
        tmpGarden.setGardenId(testGarden.getGardenId());
        gardenService.update(tmpGarden);
        assertEquals("test",(gardenService.getGardenByGardenId(tmpGarden.getGardenId())).getGardenName());
        assertEquals(1.0,(double)(gardenService.getGardenByGardenId(testGarden.getGardenId())).getPositionX());
    }

    @Test
    void getGardenByGardenId() {
    }

    @Test
    void getGardenNumberByUserId() {
        assertEquals(1,(int)gardenService.getGardenNumberByUserId(testUser.getUserId()));
    }
}