import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Echarts from 'native-echarts';


const heatData = [];

for (var i = 0; i < 20; ++i) {
    heatData.push([
        400 + Math.random() * 300,
        5 + Math.random() * 10,
        Math.random()
    ]);
}
for (var i = 0; i < 100; ++i) {
    heatData.push([
        100 + Math.random() * 600,
        150 + Math.random() * 50,
        Math.random()
    ]);
}
for (var i = 0; i < 200; ++i) {
    heatData.push([
        Math.random() * 1000,
        Math.random() * 800,
        Math.random() * 0.5
    ]);
}
option = {
    title : {
        text: '热力图'
    },
    series : [
        {
            type : 'heatmap',
            data : heatData,
            hoverable : false
        }
    ]
};

/*
const option = {
      title: {
          text: 'ECharts demo'
      },
      tooltip: {},
      legend: {
          data:['销量']
      },
      xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
    };*/

export default class Heatmap extends Component {
  render() {
    
    return (
    //<View style={{position:'relative',top:100}}>
      <Echarts  option={option} height={300}  />
   //</View>
    );
  }
}
