import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';
import data from '../SensorData/linechart.json';

const cols = {
    'value': { min: 0 },
    'year': {range: [ 0 , 1] }
  };

class LinechartPage extends Component {
render() {
return (
        <Chart height={400} data={data} scale={cols} forceFit>
        <Axis name="year" />
        <Axis name="value" />
        <Tooltip crosshairs={{type : "y"}}/>
        <Geom type="line" position="year*value" size={2} />
        <Geom type='point' position="year*value" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
        </Chart>
        );
    }
}

export default LinechartPage;