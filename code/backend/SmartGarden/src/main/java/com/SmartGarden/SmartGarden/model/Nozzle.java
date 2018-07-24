package com.SmartGarden.SmartGarden.model;


import lombok.Data;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Data
@Entity
@Table(name="nozzles")
public class Nozzle {
    public Nozzle(){

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer nozzleId;

    @Column(nullable = false)
    private Double positionX;

    @Column(nullable = false)
    private Double positionY;

    @Column(nullable = false)
    private int nozzleState=0;

    @Column(nullable = false)
    private Double radius;

    @ManyToOne()
    @JoinColumn(name = "Garden")
    @NotFound(action = NotFoundAction.IGNORE)
    private Garden garden;

    public Integer getNozzleId() {
        return nozzleId;
    }

    public void setNozzleId(Integer nozzleId) {
        this.nozzleId = nozzleId;
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

    public int getNozzleState() {
        return nozzleState;
    }

    public void setNozzleState(int nozzleState) {
        this.nozzleState = nozzleState;
    }

    public Double getRadius() {
        return radius;
    }

    public void setRadius(Double radius) {
        this.radius = radius;
    }

    public Garden getGarden() {
        return garden;
    }

    public void setGarden(Garden garden) {
        this.garden = garden;
    }
}
