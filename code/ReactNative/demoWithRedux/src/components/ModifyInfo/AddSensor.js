
import React from 'react';
import { ScrollView, Text ,View} from 'react-native';
import { Button, InputItem, List,WhiteSpace,Toast,Picker,Switch} from 'antd-mobile-rn';
import axios from 'axios';
import qs from "qs";
import {connect} from "react-redux";


class AddSensor extends React.Component{
    constructor(props:any){
        super(props);
        this.state={
            sensorType:'',
            sensorState:false,
            positionX:-1,
            positionY:-1,
            pickerValue:[]
        }
    }

    render() {
        return (
            <ScrollView
                style={{ flex: 1 }}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <List renderHeader={() => 'Add a sensor'}>
                    <InputItem
                        clear
                        error
                        onErrorPress={() =>{}}
                        value={this.state.sensorType}
                        onChange={(value: any) => {
                            this.setState({
                                sensorType:value
                            });
                        }}
                        placeholder=""
                    >
                        Sensor type
                    </InputItem>
                    <List.Item>
                        <Picker
                            title="选择地区"
                            data={['temperature','humidity','video']}
                            cols={1}
                            value={this.state.pickerValue}
                            onChange={(v: any) => {
                                this.setState({ pickerValue: v });
                                console.log(this.state.pickerValue);
                            }}
                            onOk={(v: any) => this.setState({ pickerValue: v })}
                        >
                            <List.Item arrow="horizontal" last onClick={this.onClick}>
                                省市选择(异步加载)
                            </List.Item>
                        </Picker>
                    </List.Item>
                    <List.Item extra={
                        <Switch
                            checked ={this.state.checked}
                            onChange={this.onSwitchChanged}
                        />
                    }
                    >
                        On/Off
                    </List.Item>
                    <InputItem
                        clear
                        value={this.state.positionX}
                        onChange={(value: any) => {
                            this.setState({
                                positionX: value,
                            });
                        }}
                        placeholder=""
                    >position X</InputItem>
                    <InputItem
                        clear
                        value={this.state.positionY}
                        onChange={(value: any) => {
                            this.setState({
                                positionY: value,
                            });
                        }}
                        placeholder=""
                    >position Y</InputItem>
                    <List.Item>
                        <Button
                            onClick={() => {
                                //提交数据
                                const params={
                                    sensorState:this.state.sensorState,
                                    positionX:this.state.positionX,
                                    positionY:this.state.positionY,
                                    sensorType:this.state.sensorType,
                                    gardenId:this.props.gardenId
                                }
                                axios.post('http://192.168.56.1:8080/sensors/',qs.stringify(params))
                                    .then(()=>{
                                        //todo  此处应当调用父组件的接口 修改父组件的state
                                    })
                            }}
                            type="primary"
                            disabled={this.state.gardenName===""||this.state.length===0
                            ||this.state.positionX===-1||this.state.positionY===-1
                            ||this.state.width===0}
                        >
                            submit
                        </Button>
                    </List.Item>
                    <List.Item>
                        <Button
                            onClick={() => {
                                //返回前一个页面
                                this.props.navigation.goBack()
                            }}
                            type="primary"
                        >
                            cancel
                        </Button>
                    </List.Item>
                </List.Item>
            </ScrollView>
        );
    }
}

mapStateToProps= (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(AddGarden);