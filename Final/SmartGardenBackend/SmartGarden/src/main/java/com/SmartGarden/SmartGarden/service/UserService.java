package com.SmartGarden.SmartGarden.service;

import com.SmartGarden.SmartGarden.model.User;

import java.util.List;

public interface UserService {
    boolean delete(int userId);
    User insert(User user);
    boolean update(User user);
    boolean active(int userId);
    User selectById(int id);
    List<User> selectAll();
    User login(int userId, String password);
    User loginWithEmail(String email,String password);
    User modifyUsername(int userId,String username);
    User modifyPhone(int userId,String phone);
    User modifyState(int userId,int newState);
    User modifyPassword(int userId,String password);
    User modifyEmail(int userId,String email);
    User modifyUserType(int userId,int newType);
}
