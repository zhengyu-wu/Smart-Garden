package com.SmartGarden.SmartGarden.model;


import lombok.Data;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Data
@Entity
@Table(name = "wateringConfig")
public class WateringConfig {
    public WateringConfig(){
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer configId;

    @Column
    private Double bestTempMin;

    @Column
    private Double bestTempMax;

    @Column
    private Double bestHumiMin;

    @Column
    private Double bestHumiMax;

    @Column
    private Integer configState=1;

    public Integer getConfigState() {
        return configState;
    }

    public void setConfigState(Integer configState) {
        this.configState = configState;
    }

    public Double getBestHumiMin() {
        return bestHumiMin;
    }

    public void setBestHumiMin(Double bestHumiMin) {
        this.bestHumiMin = bestHumiMin;
    }

    public Double getBestHumiMax() {
        return bestHumiMax;
    }

    public void setBestHumiMax(Double bestHumiMax) {
        this.bestHumiMax = bestHumiMax;
    }

    @ManyToOne()
    @JoinColumn(name = "Garden")
    @NotFound(action = NotFoundAction.IGNORE)
    private Garden garden;

    public Integer getConfigId() {
        return configId;
    }

    public void setConfigId(Integer configId) {
        this.configId = configId;
    }

    public Double getBestTempMin() {
        return bestTempMin;
    }

    public void setBestTempMin(Double bestTempMin) {
        this.bestTempMin = bestTempMin;
    }

    public Double getBestTempMax() {
        return bestTempMax;
    }

    public void setBestTempMax(Double bestTempMax) {
        this.bestTempMax = bestTempMax;
    }

    public Garden getGarden() {
        return garden;
    }

    public void setGarden(Garden garden) {
        this.garden = garden;
    }
}
