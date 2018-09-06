import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';
//import data from '../SensorData/linechart.json';

const cols_humidity = {
    'humidity': { min: 0 },
    'sendTime': {range: [ 0 , 1] }
  };
const cols_temperature = {
    'temperature': { min: 0 },
    'sendTime': {range: [ 0 , 1] }
  };

class LinechartPage extends Component {
render() {
    const sensorData = this.props.sensorData;
    const sensorType = this.props.sensorType;
    for(var i=0;i<sensorData.length;i++)
    {
        var new_sendTime = new Date(sensorData[i].sendTime);
        sensorData[i].sendTime=new_sendTime.getHours() + ':' + new_sendTime.getMinutes() + ':' + new_sendTime.getSeconds(); 
    }
    if(sensorType==1)
    {
        return (
            <Chart width={window.innerWidth/1.5} height={window.innerHeight/1.2} padding={[ 60, 60, 100, 60 ]} data={sensorData} scale={cols_humidity} forceFit>
            <Axis name="sendTime" />
            <Axis name="humidity" />
            <Tooltip crosshairs={{type : "y"}}/>
            <Geom type="line" position="sendTime*humidity" size={2} />
            <Geom type='point' position="sendTime*humidity" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
            </Chart>
        );
    }
    else (sensorType==2)
    {
        return (
            <Chart width={window.innerWidth/1.5} height={window.innerHeight/1.2} padding={[ 60, 60, 100, 60 ]} data={sensorData} scale={cols_temperature} forceFit>
            <Axis name="sendTime" />
            <Axis name="temperature" />
            <Tooltip crosshairs={{type : "y"}}/>
            <Geom type="line" position="sendTime*temperature" size={2} />
            <Geom type='point' position="sendTime*temperature" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
            </Chart>
        );
    }

    }
}

export default LinechartPage;