import React from 'react';
import { Text, View,FlatList } from 'react-native';
import { Card, WhiteSpace, WingBlank,Button,List,Switch,Toast,Grid} from 'antd-mobile-rn';
import {connect} from 'react-redux';
import axios from 'axios';
import SensorItem from './SensorItem';
import qs from "qs";
import _ from 'lodash';
import {HOST_NAME} from "../constants";


class Sensor extends React.Component{
    constructor(props:any){
        super(props);
        this.state={
            gardenId:this.props.navigation.state.params.gardenId,
            //data:[],//data应该是从后端拿到的数据
            overlay: [],
            sensorData:[]
        }
    }

    //因为这个组件的data这个state并不会在很多组件之间传递，所以不需要采用redux保存状态
    componentWillMount(){
        axios.get(HOST_NAME+"/sensors/getSensorByGardenId",{params:{gardenId:this.state.gardenId}})
            .then((res)=>{
                let sensorData=[];
                let tmp_overlay = [];
                //alert(JSON.stringify(res.data));
                for(let i=0;i<res.data.length;i++){
                    tmp_overlay.push(res.data[i].sensorId);

                    sensorData.push({          
                        sensorId:res.data[i].sensorId,
                        positionX:res.data[i].positionX,
                        positionY:res.data[i].positionY,
                        sensorState:res.data[i].sensorState,
                        sensorType:res.data[i].sensorType,
                        gardenId:this.state.gardenId           
                    });
                }
                this.setState({
                    overlay: tmp_overlay,
                    sensorData: sensorData
                });
            })
            .catch(err=>{
                Toast.info('Something wrong!');
                console.log('error');
                console.log(err);
                //todo 这里应该做出错的处理 页面跳转？
            })
    }

    onDeleteSensor=(sensorId)=>{
        const params = {
            sensorId: sensorId
        };
        axios.post(HOST_NAME+'/sensors/deleteSensorBySensorId', qs.stringify(params))
            .then(() => {
                Toast.info('Delete successfully!');
                this.componentWillMount();
            });
    };

    onAddSensor=()=>{
        this.componentWillMount();
    };

    
    _renderItem=(item)=>{
        /*
        return <SensorItem
        data={item.item.sensor}
        navigation={this.props.navigation}
        onDeleteSensor={this.onDeleteSensor.bind(this)}
        />*/

        
    }

    _header = () => {
        return <Button type={'primary'}
                       onClick={()=>
                       {//todo
                           this.props.navigation.navigate('AddSensor',{
                               navigation: this.props.navigation,
                               gardenId:this.state.gardenId,
                               onAddSensor:this.onAddSensor.bind(this)
                           })
                       }
                       }>
            Add sensor
        </Button>;
    }


    render(){

        data = this.state.overlay.map((i, index) => ({
            icon: '/Users/wuzhengyu/Desktop/demoWithRedux/src/assets/sensor.png',
            text: `Sensor ${i}`,
        }));

        return(
            <View style={{ paddingTop: 100 }}>
                <Grid
                data={data}
                columnNum={3}
                carouselMaxRow={3}
                isCarousel          
                onClick={(_el: any, index: any)=>{
                    this.props.navigation.navigate('SensorItem',
                          {
                              navigation: this.props.navigation,
                              data: this.state.sensorData[index],
                              onDeleteSensor:this.onDeleteSensor.bind(this)
                          })
                }} 
                />
                <Button style={{ top: 40 }} type={'primary'} onClick={()=>{
                    this.props.navigation.navigate('AddSensor',
                        {
                            update:this.componentWillMount.bind(this),
                            data: this.state.gardenId
                        })
                    }
                }>
                Add a sensor
                </Button>
            </View>
        )
    }
}

export default Sensor;

