package com.SmartGarden.SmartGarden.controller;

import javafx.application.Application;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;


@ExtendWith(SpringExtension.class)
@WebAppConfiguration()
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class UserControllerTest {

    @Autowired
    private WebApplicationContext wac;

    private MockMvc mockMvc;



    @Before
    public void  setup(){
        mockMvc= MockMvcBuilders.webAppContextSetup(wac).build();
    }

    @Test
    void login() throws Exception {
        mockMvc.perform(get("/"));
    }

    @Test
    void loginWithEmail() {
    }

    @Test
    void addUser() {
    }

    @Test
    void deleteByUserId() {
    }

    @Test
    void updateUser() {
    }

    @Test
    void activeUserWithUserId() {
    }

    @Test
    void getAllUser() {
    }
}