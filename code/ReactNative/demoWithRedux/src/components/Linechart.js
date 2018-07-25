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
function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
        ]
    }
}

var data = [];
var now = +new Date(2018, 7, 28);
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 1000;
for (var i = 0; i < 1000; i++) {
    data.push(randomData());
}

option_lc = {
	/*
    title: {
        text: '动态数据 + 时间坐标轴'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
            animation: false
        }
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        }
    },
    series: [{
        name: '模拟数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data
    }]
};


/*setInterval(function () {

    for (var i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
    }

    myChart.setOption({
        series: [{
            data: data
        }]
    });
}, 1000);*/

export default class Linechart extends Component {

   constructor(props: any) {
    super(props);
    this.state = {
      sensorId:this.props.navigation.state.params.sensorId,
      data: []
    };
  } 

  componentWillMount(){
        axios.get("http://192.168.1.147:8080/temperature/getLast20TempDataBySensorId",{params:{sensorId:this.state.sensorId}})
            .then((res)=>{
                let tmp_data =[];
                //alert(JSON.stringify(res.data));

                for(let i=0;i<res.data.length;i++){

                    tmp_data.push({
                        name:res.data[i].sendTime.toString(),
                        value: [
                            res.data[i].sendTime,
                            res.data[i].temperature
                        ]
                    });
                }
                //alert(JSON.stringify(tmp_data));

                this.setState({
                    data:tmp_data
                });
                //alert(JSON.stringify(this.state.data));

            })
            .catch(err=>{
                Toast.info('Something wrong!');
                console.log('error');
                console.log(err);
            }) 
    }

  render() {
    alert(JSON.stringify(this.state.data));
    option_lc = {
    /*
    title: {
        text: '动态数据 + 时间坐标轴'
    },* /*
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
            animation: false
        }
    },*/
    xAxis: {
        type: 'time',
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        }
    },
    series: [{
        name: '模拟数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: this.state.data
    }]
};
    

    return (
    <View style={{position:'relative',top:100}}>
      <Echarts  option={option_lc}  height={300}  />
   </View>
    );
  }
}