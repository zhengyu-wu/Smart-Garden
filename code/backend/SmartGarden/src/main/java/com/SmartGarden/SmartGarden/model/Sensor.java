package com.SmartGarden.SmartGarden.model;


import lombok.Data;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

/*
* sensor的坐标是相对于花园而言
* 以花园的左下角为原点
* sensorType 1为湿度传感器 2为温度传感器 3为监控器
* */

@Data
@Entity
@Table(name="sensors")
public class Sensor {
    public Sensor(){

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer sensorId;

    @Column(nullable = false)
    private Double positionX;

    @Column(nullable = false)
    private Double positionY;

    @Column(nullable = false)
    private int sensorType;

    @Column(nullable = false)
    private int sensorState;

    @ManyToOne()
    @JoinColumn(name = "Garden")
    @NotFound(action = NotFoundAction.IGNORE)
    private Garden garden;

    public Garden getGarden() {
        return garden;
    }

    public void setGarden(Garden garden) {
        this.garden = garden;
    }

    public Integer getSensorId() {
        return sensorId;
    }

    public void setSensorId(Integer sensorId) {
        this.sensorId = sensorId;
    }

    public Double getPositionX() {
        return positionX;
    }

    public void setPositionX(Double positionX) {
        this.positionX = positionX;
    }

    public Double getPositionY() {
        return positionY;
    }

    public void setPositionY(Double positionY) {
        this.positionY = positionY;
    }

    public int getSensorType() {
        return sensorType;
    }

    public void setSensorType(int sensorType) {
        this.sensorType = sensorType;
    }

    public int getSensorState() {
        return sensorState;
    }

    public void setSensorState(int sensorState) {
        this.sensorState = sensorState;
    }
}
