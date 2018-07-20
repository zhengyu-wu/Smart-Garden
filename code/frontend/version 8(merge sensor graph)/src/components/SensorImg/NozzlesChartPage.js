import React, {PureComponent} from 'react';
import {LineChart, ScatterChart, Scatter, Line,
   XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

    class NozzlesChartPage extends PureComponent{

      constructor(props){
        super(props);
      }
      
        render () {
            console.log('current state current length', this.props.currentGardenLength);
            console.log('current state current width', this.props.currentGardenWidth);
            console.log('current state current ID', this.props.gardenid);

            const nozzles = this.props.nozzles;
            var data11 = [];
            // for (var i = 0; i<nozzles.length;i++){
            //   console.log('nozzles[i]', nozzles[i]);
            //   if (nozzles[i].nozzleState === 1){
            //     data11.push(nozzles[i]);
            //   }
            // }
            data11 = nozzles;
            console.log('current 11:', nozzles)
            // console.log('current garden', this.state.currentGardenID);
            // console.log('current garden length', this.state.currentGardenLength);
            // console.log('current garden width', this.state.currentGardenWidth);
        return (
          <ScatterChart width={window.innerWidth/1.75} height={window.innerHeight/1.5} 
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="positionX" name="positionX" unit="m" interval="preserveStartEnd"
                type="number" domain={[0, this.props.currentGardenWidth]} />
            <YAxis dataKey="positionY" name="positionY" unit="m" interval="preserveStartEnd"
                type="number" domain={[0, this.props.currentGardenLength]} />
            <ZAxis dataKey="radius" name="Radius" unit="" range={[90,10000]}/>
            <Tooltip cursor={{ stroke: '#6699FF', strokeWidth: 1 }} />
            <Legend />
            <Scatter name="Nozzle" data={nozzles} fillOpacity={0.3} fill="#33CC99" />
          </ScatterChart>
        );
      }
    }

export default NozzlesChartPage;