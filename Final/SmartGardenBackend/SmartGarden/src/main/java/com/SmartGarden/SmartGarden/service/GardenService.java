package com.SmartGarden.SmartGarden.service;


import com.SmartGarden.SmartGarden.model.Garden;

import java.util.List;

/*
* 对花园的操作主要有
* 1：根据用户Id获取他的所有花园
* 2：增加/删除花园
* 3：根据用户Id删除他所有花园（为管理员用户提供）
* */
public interface GardenService {
    List<Garden> getGardenByUserId(int userId);
    boolean deleteByGardenId(int gardenId);
    boolean deleteByUserId(int userId);
    boolean addGardenWithUser(Garden garden,int userId);
    Garden addGardenWithUserId(Garden garden,int userId);
    boolean update(Garden garden);
    Garden getGardenByGardenId(int gardenId);
    int getGardenNumberByUserId(int userId);
}
