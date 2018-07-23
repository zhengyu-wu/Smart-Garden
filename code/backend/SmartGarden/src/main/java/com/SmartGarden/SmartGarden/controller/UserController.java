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
    public User addUser(User user)
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
    @PostMapping("/activeUserWithUserId")
    public boolean activeUserWithUserId(int userId){return userService.active(userId);}

    @ResponseBody
    @PostMapping("/modifyUsername")
    public User modifyUsername(int userId,String username){
        return userService.modifyUsername(userId,username);
    }

    @ResponseBody
    @PostMapping("/modifyUserState")
    public User modifyUserState(int userId,int newState){
        return userService.modifyState(userId,newState);
    }

    @ResponseBody
    @PostMapping("/modifyPhone")
    public User modifyPhone(int userId,String phone){
        return userService.modifyPhone(userId,phone);
    }

    @ResponseBody
    @PostMapping("/modifyEmail")
    public User modifyEmail(int userId,String email){
        return userService.modifyEmail(userId,email);
    }

    @ResponseBody
    @PostMapping("/modifyUserType")
    public User modifyUserType(int userId,int newType){
        return userService.modifyUserType(userId,newType);
    }

    @ResponseBody
    @PostMapping("/modifyPassword")
    public User modifyPassword(int userId,String password){
        return userService.modifyPassword(userId,password);
    }

    @ResponseBody
    @GetMapping("/getAllUser")
    public List<User> getAllUser()
    {
        return userService.selectAll();
    }

}
