import React from 'react';
import { Text, View,ListView } from 'react-native';
import { Card, WhiteSpace, WingBlank,Button,List,Switch,Toast} from 'antd-mobile-rn';
import {connect} from 'react-redux';
import axios from 'axios';

const Item = List.Item;
const Brief = Item.Brief;


//sensor列表的每一个最小单位
class SensorItem extends React.Component{
    constructor(){
        super();
        this.state={
            checked:false,
        };
        console.log(this.props);
    }

    componentDidMount(){
        let tmp=false;
        if(this.props.data.sensorState===1)
            this.setState({checked:true});
    }

    onSwitchChanged=(sensorId,SensorState) =>{
        //todo 在这里dispatch一个action来修改sensor state的状态,同时修改本地的state状态
        //action应该找到sensor list中对应的sensor并修改其状态
        this.setState({checked:!this.state.checked})
    };
    componentWillReceiveProps(newProps)
    {
        console.log(newProps)
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