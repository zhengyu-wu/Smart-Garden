import React from 'react';
import { Text, View,ListView } from 'react-native';
import { Card, WhiteSpace, WingBlank,Button,List,Switch,Toast} from 'antd-mobile-rn';
import {connect} from 'react-redux';
import axios from 'axios';
import qs from 'qs';

const Item = List.Item;
const Brief = Item.Brief;


//garden列表的每一个最小单位
class GardenItem extends React.Component{
    constructor(){
        super();
        this.state={
            checked:false,
        };
    }
  /*
    componentDidMount(){
        if(this.props.data.sensorState===1)
            this.setState({checked:true});
    }

    
    onSwitchChanged=(sensorId) => {
        let tmpState = 0;
        if (this.state.checked === false) {
            tmpState = 1;
        }
        this.setState({checked: !this.state.checked});

        const params = {
            sensorId: this.props.data.sensorId,
            sensorState: tmpState
        };
        axios.post('http://192.168.1.152:8080/sensors/modifySensorState', qs.stringify(params))
            .catch((error)=>
            {
                Toast.fail("unable to change the state");
            })
    };*/

    componentWillReceiveProps(newProps)
    {

    }

    render(){
        return(
            <WingBlank size="lg">
                <Card>
                    <Card.Body>
                        <List>
                            <Item extra={this.props.data.gardenId} arrow={'empty'}>
                                Garden Id
                            </Item>
                            <Item extra={this.props.data.gardenName} arrow={'empty'}>
                                Garden Name
                            </Item>
                            <Item extra={'('+this.props.data.positionX+','+this.props.data.positionY+')'} arrow={'empty'}>
                                Position
                            </Item>
                            <Item extra={this.props.data.length} arrow={'empty'} >
                                Length
                            </Item>
                            <Item  extra={this.props.data.width} arrow={'empty'} >
                                Width
                            </Item>
                        </List>
                    </Card.Body>
                </Card>
            </WingBlank>
        )
    }
}

export default GardenItem;

