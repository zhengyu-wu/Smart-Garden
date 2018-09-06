import React, {PureComponent} from 'react';
import {LineChart, ScatterChart, Scatter, Line,
   XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

    class VideoPage extends PureComponent{

      constructor(props){
        super(props);
      }
      
        render () {
          var video = document.getElementById('video');

          // Get access to the camera!
          if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
              // Not adding `{ audio: true }` since we only want video now
              navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                  video.src = window.URL.createObjectURL(stream);
                  video.play();
              });
          }
          
        return (
          <div>
              <video id="video" width={window.innerWidth/1.4} height={window.innerHeight/1.3} autoplay></video>
              <canvas id="canvas" width={window.innerWidth/1.4} height={window.innerHeight/1.3}></canvas>
          </div>
        );
      }
    }

export default VideoPage;