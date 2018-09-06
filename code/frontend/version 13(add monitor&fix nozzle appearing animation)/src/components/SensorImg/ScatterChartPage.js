import React, {PureComponent} from 'react';
import {LineChart, ScatterChart, Scatter, Line, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

    class ScatterChartPage extends PureComponent{

      constructor(props){
        super(props);
      }
      
        render () {
            console.log('current state current length', this.props.currentGardenLength);
            console.log('current state current width', this.props.currentGardenWidth);
            console.log('current state current ID', this.props.gardenid);

            const sensors = this.props.currentSensor;
            const curState = sensors.sensorState;
            var data11 = [];
            var data22 = [];
            var data33 = [];
            for (var i = 0; i<sensors.length;i++){
              console.log('sensors[i]', sensors[i]);
              if (sensors[i].sensorType === 1 && sensors[i].sensorState === 1){
                data11.push(sensors[i]);
              }else if (sensors[i].sensorType === 2 && sensors[i].sensorState === 1){
                data22.push(sensors[i]);
              }else if (sensors[i].sensorType ===3 && sensors[i].sensorState === 1){
                data33.push(sensors[i]);
              }
            }
            console.log('current sensors:', this.props.currentSensor)
            console.log('current 11:', data11)
            console.log('current 22:', data22)
            console.log('current 33:', data33)
            // console.log('current garden', this.state.currentGardenID);
            // console.log('current garden length', this.state.currentGardenLength);
            // console.log('current garden width', this.state.currentGardenWidth);
        return (
          <ScatterChart width={window.innerWidth/1.5} height={window.innerHeight/1.2} 
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="positionX" name="positionX" unit="m" interval="preserveStartEnd"
                type="number" domain={[0, this.props.currentGardenWidth]} />
            <YAxis dataKey="positionY" name="positionY" unit="m" interval="preserveStartEnd"
                type="number"domain={[0, this.props.currentGardenLength]} />
            <ZAxis dataKey="sensorId" name="sensor ID" unit="" />
            <Tooltip cursor={{ stroke: '#6699FF', strokeWidth: 1 }} />
            <Legend />
            <Scatter name="temperature" data={data11} fill="#CC3333" />
            <Scatter name="humor" data={data22} fill="#00CC99" />
            <Scatter name="monitor" data={data33} fill="#3366CC" />
          </ScatterChart>
        );
      }
    }

export default ScatterChartPage;