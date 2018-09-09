package com.SmartGarden.SmartGarden.service;

import com.SmartGarden.SmartGarden.model.User;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class UserServiceTest {

    @Autowired
    private UserService userService;

    private User testUser;

    @org.junit.jupiter.api.BeforeEach
    void setUp() {
        testUser=new User();
        testUser.setUserState(0);
        testUser.setPassword("123");
        testUser.setEmail("qwq@s.com");
        testUser.setPhone("18322232423");
        testUser.setUsername("unitTest");
        testUser.setUserType(0);
        testUser.setUserId(userService.insert(testUser).getUserId());
    }

    @org.junit.jupiter.api.AfterEach
    void tearDown() {
        userService.delete(testUser.getUserId());
        testUser=null;
    }

    @org.junit.jupiter.api.Test
    void delete() {
        userService.delete(testUser.getUserId());
        assertNull(userService.selectById(testUser.getUserId()));
    }

    @org.junit.jupiter.api.Test
    void insertFail() {
        assertNull(userService.insert(testUser));
    }

    @org.junit.jupiter.api.Test
    void update() {
        User tmpUser=new User();
        tmpUser.setUserId(testUser.getUserId());
        tmpUser.setUserType(1);
        tmpUser.setUsername("unitTestModify");
        tmpUser.setPassword("321");
        tmpUser.setEmail("233@c.com");
        tmpUser.setPhone("11111111111");
        userService.update(tmpUser);
        User gotUser=userService.selectById(testUser.getUserId());
        assertEquals("unitTestModify",gotUser.getUsername());
        assertEquals("321",gotUser.getPassword());
        assertEquals("11111111111",gotUser.getPhone());
        assertEquals((int)1,(int)gotUser.getUserType());
        assertEquals("233@c.com",gotUser.getEmail());
        assertEquals(testUser.getUserState(),gotUser.getUserState());
    }

    @org.junit.jupiter.api.Test
    void updateFailWithNoId() {
        User tmpUser=new User();
        tmpUser.setUserId(null);
        tmpUser.setUserType(1);
        tmpUser.setUsername("unitTestModify");
        tmpUser.setPassword("321");
        tmpUser.setEmail("233@c.com");
        tmpUser.setPhone("11111111111");
        assertEquals(false,userService.update(tmpUser));
    }

    @org.junit.jupiter.api.Test
    void updateFailWithFalseId() {
        User tmpUser=new User();
        tmpUser.setUserId(10086);
        tmpUser.setUserType(1);
        tmpUser.setUsername("unitTestModify");
        tmpUser.setPassword("321");
        tmpUser.setEmail("233@c.com");
        tmpUser.setPhone("11111111111");
        assertFalse(userService.update(tmpUser));
    }

    @org.junit.jupiter.api.Test
    void active() {
        userService.active(testUser.getUserId());
        assertEquals(1,(int)userService.selectById(testUser.getUserId()).getUserState());
        assertFalse(userService.active(testUser.getUserId()));
    }

    @org.junit.jupiter.api.Test
    void selectById() {
    }

    @org.junit.jupiter.api.Test
    void selectAll() {
    }

    @org.junit.jupiter.api.Test
    void loginSuccess() {
        User tmpUser=userService.login(testUser.getUserId(),testUser.getPassword());
        assertEquals(testUser.getUsername(),tmpUser.getUsername());

    }

    @org.junit.jupiter.api.Test
    void loginFailWithWrongPassword() {
        User tmpUser=userService.login(1,"124");
        assertNull(tmpUser);
    }

    @org.junit.jupiter.api.Test
    void loginFailWithWrongId() {
        User tmpUser=userService.login(10086,"124");
        assertNull(tmpUser);
    }

    @org.junit.jupiter.api.Test
    void loginWithEmailSuccess() {
        User tmpUser=userService.loginWithEmail(testUser.getEmail(),testUser.getPassword());
        assertEquals(testUser.getUsername(),tmpUser.getUsername());
    }

    @org.junit.jupiter.api.Test
    void loginWithEmailFailWithWrongPassword() {
        User tmpUser=userService.loginWithEmail(testUser.getEmail(),"124");
        assertNull(tmpUser);
    }

    @org.junit.jupiter.api.Test
    void loginWithEmailFailWithWrongEmail() {
        User tmpUser=userService.loginWithEmail("invalid@test.com","124");
        assertNull(tmpUser);
    }

}