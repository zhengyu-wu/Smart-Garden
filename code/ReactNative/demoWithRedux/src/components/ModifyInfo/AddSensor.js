
import React from 'react';
import { ScrollView, Text ,View} from 'react-native';
import { Button, InputItem, List,WhiteSpace,Toast,Picker,Switch} from 'antd-mobile-rn';
import axios from 'axios';
import qs from "qs";
import {HOST_NAME} from "../../constants";

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

    onSwitchChanged=()=>{
        this.setState({
            sensorState:!this.state.sensorState
        })
    };

    render() {
        const SENSOR_TYPE=[{
            'label':'Temperature',
            'value':'1'
        },{
            'label':'Humidity',
            'value':'2'
        },{
            'label':'Video',
            'value':'3'
        }];

        //todo 下面还是有一些地方要改东西的 比如根据花园大小判断按钮是否生效

        return (
            <ScrollView
                style={{ flex: 1 }}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <List renderHeader={() => 'Add a sensor'}>
                    <List.Item>
                        <Picker
                            title="choose a type"
                            data={SENSOR_TYPE}
                            cols={1}
                            value={this.state.pickerValue}
                            onChange={(v: any) => {
                                console.log(v);
                                this.setState({ pickerValue: v });
                                console.log(JSON.stringify(this.state.pickerValue));
                            }}
                            onOk={(v: any) => {
                                console.log(v);
                                this.setState({ pickerValue: v })
                            }}
                        >
                            <List.Item arrow="horizontal" last onClick={this.onClick}>
                                type
                            </List.Item>
                        </Picker>
                    </List.Item>
                    <List.Item extra={
                        <Switch
                            checked ={this.state.sensorState}
                            onChange={this.onSwitchChanged}
                        />
                    }
                    >
                        On/Off
                    </List.Item>
                    <InputItem
                        clear
                        value={this.state.positionX.toString()}
                        onChange={(value: any) => {
                            this.setState({
                                positionX: value,
                            });
                        }}
                        placeholder="the x position of the sensor"
                    >X</InputItem>
                    <InputItem
                        clear
                        value={this.state.positionY.toString()}
                        onChange={(value: any) => {
                            this.setState({
                                positionY: value,
                            });
                        }}
                        placeholder="the y position of the sensor"
                    >Y</InputItem>
                    <List.Item>
                        <Button
                            onClick={() => {
                                //提交数据
                                let tmpState= this.state.sensorState?1:0;
                                let tmpType=this.state.pickerValue[0];
                                const params={
                                    sensorState:tmpState,
                                    positionX:this.state.positionX,
                                    positionY:this.state.positionY,
                                    sensorType:tmpType,
                                    gardenId:this.props.navigation.state.params.gardenId
                                };
                                console.log('params');
                                console.log(params);
                                console.log(this.state.pickerValue);
                                axios.post(HOST_NAME+'/sensors/addSensorWithGardenId',qs.stringify(params))
                                    .then(()=>{
                                        this.props.navigation.state.params.onAddSensor();
                                        Toast.success('add successfully');
                                        this.props.navigation.goBack();
                                    })
                                    .catch((err)=>{
                                        Toast.fail('something wrong');
                                        console.log('in err adda sensor');
                                        console.log(err);
                                    })
                            }}
                            type="primary"
                            disabled={this.state.gardenName===""||this.state.length===0
                            ||this.state.positionX===-1||!this.state.positionY===-1
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
                </List>
            </ScrollView>
        );
    }
}



export default AddSensor;