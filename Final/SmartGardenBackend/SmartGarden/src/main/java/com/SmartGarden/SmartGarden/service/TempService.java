package com.SmartGarden.SmartGarden.service;

import com.SmartGarden.SmartGarden.model.TempData;

import java.util.List;

/*
* 对温度数据的操作包括：
* 1.增加数据
* 2.删除某条数据，删除某个传感器的所有生成数据，删除某个时间范围内的数据
* 3.获取某个传感器的数据，获取某个区域范围内的数据，获取某个时间范围内的所有数据
* */

public interface TempService {
    boolean addTempData(TempData tempData,int sensorId);
    boolean deleteByTempDataId(Integer tempDataId);
    List<TempData> getLast20DataBySensorId(int sensorId);
    List<TempData> getLast15DataBySensorId(int sensorId);
    List<TempData> getLastTempDataByGardenId(int gardenId);

}
