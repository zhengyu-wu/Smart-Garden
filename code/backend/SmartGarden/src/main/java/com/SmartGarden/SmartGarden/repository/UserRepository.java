package com.SmartGarden.SmartGarden.repository;

import com.SmartGarden.SmartGarden.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

//采用SpringData JPA的命名方法自动生成函数实现
@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    //自定义repository。手写sql
    @Query(value = "update users set username=?1 where id=?2",nativeQuery = true)   //占位符传值形式
    @Modifying
    int updateById(String name,int id);

    @Query("from User u where u.username=:username")   //SPEL表达式
    User findByUsername(@Param("username") String username);// 参数username 映射到数据库字段username

    User findByUserId(Integer userId);
    User findByEmail(String email);


}
