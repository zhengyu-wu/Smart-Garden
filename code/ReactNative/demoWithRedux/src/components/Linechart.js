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

function hourTransform(str){

    var hour = '';
    switch(str)
    {
        case 'T17':
            hour = '01';
            break;
        case 'T18':
            hour = '02';
            break;
        case 'T19':
            hour = '03';
            break;
        case 'T20':
            hour = '04';
            break;
        case 'T21':
            hour = '05';
            break;
        case 'T22':
            hour = '06';
            break;
        case 'T23':
            hour = '07';
            break;
        case 'T24':
            hour = '08';
            break;
        case 'T01':
            hour = '09';
            break;
        case 'T02':
            hour = '10';
            break;
        case 'T03':
            hour = '11';
            break;
        case 'T04':
            hour = '12';
            break;
        case 'T05':
            hour = '13';
            break;
        case 'T06':
            hour = '14';
            break;
        case 'T07':
            hour = '15';
            break;
        case 'T08':
            hour = '16';
            break;
        case 'T09':
            hour = '17';
            break;
        case 'T10':
            hour = '18';
            break;
        case 'T11':
            hour = '19';
            break;
        case 'T12':
            hour = '20';
            break;
        case 'T13':
            hour = '21';
            break;
        case 'T14':
            hour = '22';
            break;
        case 'T15':
            hour = '23';
            break;
        case 'T16':
            hour = '00';
            break;
    }
    return hour;
}

export default class Linechart extends Component {

   constructor(props: any) {
    super(props);
    this.state = {
      sensorId:this.props.navigation.state.params.sensorId,
      data: [],
      x_data:[],
      option:[]
    };
  } 

  componentWillMount(){

    this.timer =setInterval(
                () => {

        axios.get("http://10.162.16.207:8080/temperature/getLast20TempDataBySensorId",{params:{sensorId:this.state.sensorId}})
            .then((res)=>{
                let tmp_data =[];
                let tmp_x_data =[];

                for(let i=0;i<res.data.length;i++){

                    var year = res.data[i].sendTime.slice(0,4);
                    var month = res.data[i].sendTime.slice(5,7);
                    var day = res.data[i].sendTime.slice(8,10);

                    tmp_x_data.push(

                        hourTransform(res.data[res.data.length-1-i].sendTime.slice(10,13)) + res.data[res.data.length-1-i].sendTime.slice(13,19)

                    );

                    tmp_data.push(

                        res.data[res.data.length-1-i].temperature

                    );
                }
                //alert(JSON.stringify(tmp_data));
                let option_lc = {
                    title: {
                        text: 'Real-time temperature of your garden',
                        top: 'top'
                      },

                    xAxis: {
                        type: 'category',
                        /*
                        splitLine: {
                            show: false
                        },*/
                        data:tmp_x_data
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%'],
                        splitLine: {
                            show: false
                        }
                    },
                    series: [{
                        name: 'Simulated data',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        data: tmp_data
                    }]
                };

                this.setState({
                    data:tmp_data,
                    x_data:tmp_x_data,
                    option:option_lc
                });
                //alert(JSON.stringify(this.state.data));

            })
            .catch(err=>{
                Toast.info('Something wrong!');
                console.log('error');
                console.log(err);
            }) 


            },
                3000
            );
    }

  render() {


    

    return (
    <View style={{position:'relative',top:100}}>
      <Echarts  option={this.state.option}  height={300}  />
   </View>
    );
  }
}