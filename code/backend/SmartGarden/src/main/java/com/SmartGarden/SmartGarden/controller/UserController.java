package com.SmartGarden.SmartGarden.controller;


import com.SmartGarden.SmartGarden.model.User;
import com.SmartGarden.SmartGarden.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @ResponseBody
    @GetMapping("/loginWithUserId")
    public User login(@RequestParam(value="userId")int userId, @RequestParam("password")String password){
        return userService.login(userId,password);
    }

    @ResponseBody
    @GetMapping("/loginWithEmail")
    public User loginWithEmail(String email,String password)
    {
        return userService.loginWithEmail(email,password);
    }

    @ResponseBody
    @PostMapping("/addUser")
    public boolean addUser(User user)
    {
        return userService.insert(user);
    }

    @ResponseBody
    @PostMapping("/deleteByUserId")
    public boolean deleteByUserId(int userId){
        return userService.delete(userId);
    }

    @ResponseBody
    @PostMapping("/updateUser")
    public boolean updateUser(User user)
    {
        return userService.update(user);
    }

    @ResponseBody
    @GetMapping("/getAllUser")
    public List<User> getAllUser()
    {
        return userService.selectAll();
    }

}
