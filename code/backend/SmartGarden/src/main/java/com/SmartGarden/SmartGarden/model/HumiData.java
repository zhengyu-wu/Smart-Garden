package com.SmartGarden.SmartGarden.model;


import lombok.Data;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.Date;

/*
* 湿度信息 湿度humidity一律简写成humi
* */

@Data
@Entity
@Table(name = "humiData")
public class HumiData {
    public HumiData(){

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer humiDataId;

    @ManyToOne()
    @JoinColumn(name="Sensor")
    @NotFound(action = NotFoundAction.IGNORE)
    private Sensor sensor;

    @Column(nullable = false)
    private Double positionX;

    @Column(nullable = false)
    private Double positionY;

    @Column(nullable = false)
    private Double humidity;

    @Column(nullable = false)
    private Date sendTime;

    public Integer getHumiDataId() {
        return humiDataId;
    }

    public void setHumiDataId(Integer humiDataId) {
        this.humiDataId = humiDataId;
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

    public Double getHumidity() {
        return humidity;
    }

    public void setHumidity(Double humidity) {
        this.humidity = humidity;
    }

    public Date getSendTime() {
        return sendTime;
    }

    public void setSendTime(Date sendTime) {
        this.sendTime = sendTime;
    }
}
