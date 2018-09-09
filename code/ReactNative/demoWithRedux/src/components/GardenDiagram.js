import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Echarts from 'native-echarts';
import axios from 'axios';
import qs from 'qs';
import { Button, Drawer, List, WhiteSpace, Popover, Toast } from 'antd-mobile-rn';

/*
var data = [
    [[44056,77,27662440,'Australia',1990],[44056,77.4,27662440,'Canada',1990]],
    [[44056,81.8,27662440,'Australia',2015],[44056,81.7,27662440,'Canada',2015]]
];*/

export default class GardenDiagram extends Component {

    constructor(props: any) {
        super(props);
        this.state = {
            gardenId:this.props.navigation.state.params.gardenId,
            sensor_data: [],
            nozzle_data: []
        };
    } 

    componentWillMount(){
        axios.get("http://10.162.16.207:8080/sensors/getSensorByGardenId",{params:{gardenId:this.state.gardenId}})
            .then((res)=>{
                let tmp_sensor_data=[];
                //alert(JSON.stringify(res.data));

                for(let i=0;i<res.data.length;i++){

                    let row_data = [];

                    row_data.push(
                        res.data[i].positionX,
                        res.data[i].positionY,
                        27662440,
                        'Sensor ID '+ res.data[i].sensorId,
                        'Sensor'
                    );
                    tmp_sensor_data.push(row_data);
                }
                this.setState({
                    sensor_data:tmp_sensor_data
                });

            })
            .catch(err=>{
                Toast.info('Something wrong!');
                console.log('error');
                console.log(err);
            })

        axios.get("http://10.162.16.207:8080/nozzles/getNozzleByGardenId",{params:{gardenId:this.state.gardenId}})
            .then((res)=>{
                let tmp_nozzle_data = [];
                //alert(JSON.stringify(res.data));

                for(let i=0;i<res.data.length;i++){

                    let row_data = [];

                    row_data.push(
                        res.data[i].positionX,
                        res.data[i].positionY,
                        27662440,
                        'Nozzle ID '+ res.data[i].nozzleId,
                        'Nozzle'
                    );
                    tmp_nozzle_data.push(row_data);
                }
                this.setState({
                    nozzle_data:tmp_nozzle_data
                });

            })
            .catch(err=>{
                Toast.info('Something wrong!');
                console.log('error');
                console.log(err);
            }) 
    }

  

    render() {

    option_gd = {
    
    title: {
        text: 'The diagram of your garden',
        top: 'top'
    },
    legend: {
        right: 10,
        data: ['Sensor', 'Nozzle'],
        top: 30
    },
    xAxis: {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        }
    },
    yAxis: {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        scale: true
    },
    series: [{
        name: 'Sensor',
        data: this.state.sensor_data,
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        label: {
            emphasis: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }        
        },
        itemStyle: {
            normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(120, 36, 50, 0.5)',
                shadowOffsetY: 5,
            }
        }
    }, {
        name: 'Nozzle',
        data: this.state.nozzle_data,
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        label: {
            emphasis: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
        itemStyle: {
            normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(25, 100, 150, 0.5)',
                shadowOffsetY: 5,
            }
        }
    }]
};

    return (
    <View style={{position:'relative',top:100}}>
      <Echarts  option={option_gd}  height={300}  />
   </View>
    );
  }
}




