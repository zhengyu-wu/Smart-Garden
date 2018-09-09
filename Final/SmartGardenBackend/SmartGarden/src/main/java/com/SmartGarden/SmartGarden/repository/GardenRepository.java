package com.SmartGarden.SmartGarden.repository;


import com.SmartGarden.SmartGarden.model.Garden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

//采用SpringData JPA的命名方法自动生成函数实现
@Repository
public interface GardenRepository extends JpaRepository<Garden,Integer> {
    List<Garden> findByUser_UserId(int userId);
    @Transactional
    void deleteByUser_UserId(int userId);
    Garden findByGardenId(int gardenId);
    int countByUser_UserId(int userId);
}
