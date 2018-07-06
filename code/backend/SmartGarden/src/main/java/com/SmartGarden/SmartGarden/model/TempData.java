package com.SmartGarden.SmartGarden.model;


import lombok.Data;

import javax.persistence.*;
import java.util.Date;

/*
* 温度信息 温度temperature一律简写成temp
* */

@Data
@Entity
@Table(name = "tempData")
public class TempData {
    public TempData(){

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer tempDataId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "Sensor")
    private Sensor sensor;

    @Column(nullable = false)
    private Double positionX;

    @Column(nullable = false)
    private Double positionY;

    @Column(nullable = false)
    private Double temperature;

    @Column(nullable = false)
    private Date sendTime;

    public Integer getTempDataId() {
        return tempDataId;
    }

    public void setTempDataId(Integer tempDataId) {
        this.tempDataId = tempDataId;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
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

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Date getTime() {
        return sendTime;
    }

    public void setTime(Date sendTime) {
        this.sendTime = sendTime;
    }
}
