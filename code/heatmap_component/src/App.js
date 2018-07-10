import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import data from './heatmap.json';
import { Chart, Geom, Tooltip, Legend,Guide } from 'bizcharts';

const { Image } = Guide;

      
class App extends Component {


    render(){
      return(
          <Chart height={window.innerHeight} padding={[ 0, 30, 60, 30 ]} data={data} forceFit>
            <Tooltip showTitle={false}/>
            <Legend offset={10} />
            <Geom type='heatmap' position="g*l" color={['tmp', '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2']} />
            <Guide>
            </Guide>
          </Chart>
      );
    }         
}


export default App;