package com.SmartGarden.SmartGarden.model;


import lombok.Data;

import javax.persistence.*;

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
