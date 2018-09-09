package com.SmartGarden.SmartGarden.service.impl;


import com.SmartGarden.SmartGarden.model.User;
import com.SmartGarden.SmartGarden.repository.UserRepository;
import com.SmartGarden.SmartGarden.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean delete(int userId) {
        try {
            userRepository.deleteById(userId);
            return true;
        }
        catch (Exception e){
            return  false;
        }
    }

    @Override
    public User insert(User user) {
        try {
            //插入前先看看这个email在数据库中是否存在
            //存在则不在插入
            User tmpUser=userRepository.findByEmail(user.getEmail());
            if(tmpUser!=null)
                return null;
            return userRepository.saveAndFlush(user);
        }
        catch (Exception e){
            return null;
        }
    }

    @Override
    public boolean update(User user) {
        try {
            //更新前先看看所传入的user有没有userId，同时看看数据库中是否有对应的user
            //只有在数据库中有对应的user时才执行更新
            if(user.getUserId()==null)
                return false;
            User tmpUser=userRepository.findByUserId(user.getUserId());
            if(tmpUser==null)
                return false;
            userRepository.save(user);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    @Override
    public boolean active(int userId) {
        try {
            User tmpUser=userRepository.findByUserId(userId);
            if(tmpUser.getUserState()!=0)
                return false;
            else {
                tmpUser.setUserState(1);
                userRepository.save(tmpUser);
                return true;
            }
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public User selectById(int id) {
        return userRepository.findByUserId(id);
    }

    @Override
    public List<User> selectAll() {
        return userRepository.findAll();
    }

    @Override
    public User login(int userId, String password) {
        User tmpUser=null;
        tmpUser=userRepository.findByUserId(userId);
        if(tmpUser==null)
            return null;
        if(tmpUser.getPassword().equals(password)) {
            tmpUser.setPassword("");
            return tmpUser;
        }
        else return null;
    }

    @Override
    public User loginWithEmail(String email, String password) {
        User tmpUser=null;
        tmpUser=userRepository.findByEmail(email);
        if(tmpUser==null)
            return null;
        if(tmpUser.getPassword().equals(password))
            return tmpUser;
        else return null;
    }

    @Override
    public User modifyUsername(int userId, String username) {
        User tmpUser=userRepository.findByUserId(userId);
        if(tmpUser==null)
            return null;
        try {
            tmpUser.setUsername(username);
            userRepository.save(tmpUser);
            return tmpUser;
        }
        catch (Exception e){
            return null;
        }


    }

    @Override
    public User modifyPhone(int userId, String phone) {
        User tmpUser=userRepository.findByUserId(userId);
        if(tmpUser==null)
            return null;
        try {
            tmpUser.setPhone(phone);
            userRepository.save(tmpUser);
            return tmpUser;
        }
        catch (Exception e){
            return null;
        }
    }

    @Override
    public User modifyState(int userId, int newState) {
        User tmpUser=userRepository.findByUserId(userId);
        if(tmpUser==null)
            return null;
        try {
            tmpUser.setUserState(newState);
            userRepository.save(tmpUser);
            return tmpUser;
        }
        catch (Exception e){
            return null;
        }
    }

    @Override
    public User modifyPassword(int userId, String password) {
        User tmpUser=userRepository.findByUserId(userId);
        if(tmpUser==null)
            return null;
        try {
            tmpUser.setPassword(password);
            userRepository.save(tmpUser);
            return tmpUser;
        }
        catch (Exception e){
            return null;
        }
    }

    @Override
    public User modifyEmail(int userId, String email) {
        User tmpUser=userRepository.findByUserId(userId);
        if(tmpUser==null)
            return null;
        try {
            tmpUser.setEmail(email);
            userRepository.save(tmpUser);
            return tmpUser;
        }
        catch (Exception e){
            return null;
        }
    }

    @Override
    public User modifyUserType(int userId, int newType) {
        User tmpUser=userRepository.findByUserId(userId);
        if(tmpUser==null)
            return null;
        try {
            tmpUser.setUserType(newType);
            userRepository.save(tmpUser);
            return tmpUser;
        }
        catch (Exception e){
            return null;
        }
    }
}
