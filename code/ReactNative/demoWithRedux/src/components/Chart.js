import React from 'react';
import { SegmentedControl, WingBlank, View } from 'antd-mobile-rn';
import { connect } from 'react-redux';


class Segment extends React.Component {
  onChange = (e) => {
    console.log('selectedIndex:${e.nativeEvent.selectedSegmentIndex}');
  }
  onValueChange = (value) => {
    console.log(value);
  }
  render() {
    return (
      <View style={{position:'relative',top:50}}>

        <WingBlank size="lg" >
      
          <SegmentedControl 
            values={['热力图', '实时折线图']} 
            onChange={this.onChange}
            onValueChange={this.onValueChange} 
          />

        </WingBlank>
      </View>
    );
  }
}


export default Segment;