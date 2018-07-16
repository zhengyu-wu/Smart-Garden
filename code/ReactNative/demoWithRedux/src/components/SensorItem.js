import React from 'react';
import { Text, View,ListView } from 'react-native';
import { Card, WhiteSpace, WingBlank,Button,List,Switch,Toast} from 'antd-mobile-rn';
import {connect} from 'react-redux';
import axios from 'axios';
import qs from 'qs';

const Item = List.Item;
const Brief = Item.Brief;


//sensor列表的每一个最小单位
class SensorItem extends React.Component{
    constructor(){
        super();
        this.state={
            checked:false,
        };
    }

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
        axios.post('http://192.168.56.1:8080/sensors/modifySensorState', qs.stringify(params))
            .catch((error)=>
            {
                Toast.fail("unable to change the state");
            })
    };

    componentWillReceiveProps(newProps)
    {

    }

    render(){
        return(
            <WingBlank size="lg">
                <Card>
                    <Card.Body>
                        <List>
                            <Item extra={this.props.data.sensorId} arrow={'empty'}>
                                sensor id
                            </Item>
                            <Item extra={this.props.data.sensorType} arrow={'empty'}>
                                sensor type
                            </Item>
                            <Item extra={'('+this.props.data.positionX+','+this.props.data.positionY+')'} arrow={'horizontal'} onClick={()=>{}}>
                                position
                            </Item>
                            <Item arrow={'horizontal'} onClick={()=>{}}>
                                view data
                            </Item>
                            <Item extra={
                                <Switch
                                    checked ={this.state.checked}
                                    onChange={this.onSwitchChanged}
                                />
                            }
                            >
                                On/Off
                            </Item>
                        </List>
                    </Card.Body>
                </Card>
            </WingBlank>
        )
    }
}

export default SensorItem;