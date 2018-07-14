import React from 'react';
import { SegmentedControl, WingBlank, View } from 'antd-mobile-rn';
import { connect } from 'react-redux';
import Heatmap from './Heatmap';
import Linechart from './Linechart';


class Segment extends React.Component {

constructor(){
  super();
  this.state={
    value:'热力图'
  }
}

  onChange = (e) => {
    this.setState({value: e.nativeEvent.value});
  }
 

  render() {



    return (
      <View style={{position:'relative',top:50}}>

        <WingBlank size="lg" >
      
          <SegmentedControl 
            values={['热力图', '实时折线图']} 
            onChange={this.onChange}
          />

        </WingBlank>
        {
          this.state.value =='实时折线图'
          ? <Linechart />
          : <Heatmap />
        }
      </View>
    );
  }
}


export default Segment;