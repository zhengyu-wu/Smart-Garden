import React, { Component } from 'react';
import data from '../SensorData/heatmap.json';
import { Chart, Geom, Tooltip, Legend,Guide } from 'bizcharts';

const { Image } = Guide;
//let  data= require('heatmap.json');
      
class HeatmapPage extends Component {

    render(){
        console.log('Received values of data: ', data);
      return(

          <Chart height={window.innerHeight} padding={[ 60, 60, 100, 60 ]} data={data} forceFit>
            <Tooltip showTitle={false}/>
            <Legend offset={10} />
            <Geom type='heatmap' position="g*l" color={['tmp', '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2']} />
            <Guide>
            </Guide>
          </Chart>
      );
    }         
}


export default HeatmapPage;