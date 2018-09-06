import React, { Component } from 'react';
import data from '../SensorData/heatmap.json';
import { Chart, Geom, Tooltip, Legend,Guide,Axis } from 'bizcharts';

const { Image } = Guide;
//let  data= require('heatmap.json');

      
class HeatmapPage extends Component {

    render(){
        var gardenData = this.props.gardenData;
        var gardenLength = this.props.gardenLength;
        var gardenWidth = this.props.gardenWidth;

        var cols_garden = {
            'positionX': {min:0,max:gardenLength },
            'positionY': {min:0,max:gardenWidth }
        };

        console.log('Received values of data: ', gardenData);
        if(gardenData.length>0)
        {
            return(
                <Chart width={window.innerWidth/1.5} height={window.innerHeight/1.2} padding={[ 60, 60, 100, 60 ]} data={gardenData} scale={cols_garden} forceFit >
                  <Axis name="positionX" />
                  <Axis name="positionY" />
                  <Tooltip showTitle={false}/>
                  <Legend offset={10} />
                  <Geom type='heatmap' position="positionX*positionY" color={['temperature', '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2']} />
                  <Guide>
                  </Guide>
                </Chart>
            );
        }
        else
        {
            return(
                <div>
                    <div style={{padding:100}}></div>
                    <center><h>No data</h></center>
                </div>
            );
        }
      
    }         
}


export default HeatmapPage;