package com.SmartGarden.SmartGarden.service;

import com.SmartGarden.SmartGarden.model.User;

import java.util.List;

public interface UserService {
    boolean delete(int userId);
    boolean insert(User user);
    boolean update(User user);
    boolean active(int userId);
    User selectById(int id);
    List<User> selectAll();
    User login(int userId, String password);
    User loginWithEmail(String email,String password);

}
