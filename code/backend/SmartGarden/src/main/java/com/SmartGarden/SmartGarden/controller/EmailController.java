package com.SmartGarden.SmartGarden.controller;

import com.SmartGarden.SmartGarden.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Random;

@Controller
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @ResponseBody
    @GetMapping("/sendEmail")
    public int sendEmail(String recv){
        int code=new Random().nextInt(999999-100000)+100000;
        System.out.println("generate code"+code);
        if(emailService.sendEmail(recv,code)){
            return code;
        }
        else return -1;
    }
}
