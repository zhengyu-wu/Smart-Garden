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
    public boolean insert(User user) {
        try {
            //插入前先看看这个email在数据库中是否存在
            //存在则不在插入
            User tmpUser=userRepository.findByEmail(user.getEmail());
            if(tmpUser!=null)
                return false;
            userRepository.save(user);
            return true;
        }
        catch (Exception e){
            return false;
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
        if(tmpUser.getPassword().equals(password))
            return tmpUser;
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
}
