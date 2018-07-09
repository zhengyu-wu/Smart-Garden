import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';
import * as d3Hexbin from 'd3-hexbin';

import {} from './heatmap.js'

class App extends Component {



  render() {

    var heatmapInstance = h337.create({
        container: document.querySelector('#root'),
         });

     var points = [];
     var max = 0;
     var width = 600;
     var height = 400;
     var len = 200;
     while (len--) {
             var val = Math.floor(Math.random()*100);
             max = Math.max(max, val);
             var point = {
                    x: Math.floor(Math.random()*width),
                     y: Math.floor(Math.random()*height),
                     value: val
             };
             points.push(point);
         }
     var data = {
             max: max,
             data: points
     };
     
     heatmapInstance.setData(data); 

    return (
      <div id="root"></div>
    );
  }
}


export default App;
