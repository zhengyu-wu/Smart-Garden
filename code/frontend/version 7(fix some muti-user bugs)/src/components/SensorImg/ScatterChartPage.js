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
            var data11 = [];
            var data22 = [];
            var data33 = [];
            for (var i = 0; i<sensors.length;i++){
              console.log('sensors[i]', sensors[i]);
              if (sensors[i].sensorType === 1){
                data11.push(sensors[i]);
              }else if (sensors[i].sensorType === 2){
                data22.push(sensors[i]);
              }else if (sensors[i].sensorType ===3){
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
          <ScatterChart width={900} height={900}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="positionX" name="positionX" unit="m" type="number" domain={[0, this.props.currentGardenWidth]} />
            <YAxis dataKey="positionY" name="positionY" unit="m" type="number" domain={[0, this.props.currentGardenLength]} />
            <ZAxis dataKey="sensorState" name="state" unit="" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="温度传感器嘻嘻嘻" data={data11} fill="#8884d8" />
            <Scatter name="湿度传感器哈哈哈" data={data22} fill="#82ca9d" />
            <Scatter name="监控器嘿嘿嘿" data={data33} fill="black" />
          </ScatterChart>
        );
      }
    }

export default ScatterChartPage;