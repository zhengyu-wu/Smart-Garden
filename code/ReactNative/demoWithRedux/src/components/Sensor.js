import React from 'react';
import { Text, View,ListView } from 'react-native';
import { Card, WhiteSpace, WingBlank,Button,List,Switch,Toast} from 'antd-mobile-rn';
import {connect} from 'react-redux';
import axios from 'axios';
import SensorItem from './SensorItem';
import qs from "qs";
import _ from 'lodash';

const Item = List.Item;
const Brief = Item.Brief;


class Sensor extends React.Component{
    constructor(props:any){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            gardenId:this.props.navigation.state.params.gardenId,
            data:[],//data应该是从后端拿到的数据
            ds:ds,
            isLoading:true,
            dataLength:0
        }
    }

    //因为这个组件的data这个state并不会在很多组件之间传递，所以不需要采用redux保存状态
    componentWillMount(){
        axios.get("http://192.168.56.1:8080/sensors/getSensorByGardenId",{params:{gardenId:this.state.gardenId}})
            .then((res)=>{
                let tmpData=[];
                for(let i=0;i<res.data.length;i++){
                    tmpData.push({
                        sensorId:res.data[i].sensorId,
                        positionX:res.data[i].positionX,
                        positionY:res.data[i].positionY,
                        sensorState:res.data[i].sensorState,
                        sensorType:res.data[i].sensorType
                    });
                }
                console.log('in cwm');
                let newData=_.cloneDeep(tmpData);
                console.log(newData);
                this.setState({
                    data:newData,
                    ds:this.state.ds.cloneWithRows(newData),
                    isLoading:false,
                    dataLength:res.data.length
                });
            })
            .catch(err=>{
                Toast.info('Something wrong!');
                console.log('error');
                console.log(err);
                //todo 这里应该做出错的处理 页面跳转？
            })
    }

    onDeleteSensor=()=>{
        /*
        let tmpState=this.state.data;
        let tmpDatas=[];
        console.log('in sensor');
        console.log(sensorId);
        for(let i=0;i<tmpState.length;i++){
            if(tmpState[i].sensorId!==sensorId){
                tmpDatas.push(tmpState[i]);
                console.log(tmpState[i]);
            }
        }
        const params={
            sensorId:sensorId
        };
        axios.post('http://192.168.56.1:8080/sensors/deleteSensorBySensorId',qs.stringify(params))
            .then(()=>{
                Toast.info('successfully delete');
                this.setState({
                    data:tmpDatas,
                    ds:this.state.ds.cloneWithRows(tmpDatas),
                    dataLength:tmpDatas.length
                })
            })*/
        this.componentWillMount();
    };
    onAddSensor=()=>{
        this.componentWillMount();
    };

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",

                }}
            />
        );
    }

    render(){
        let currentData=0;
        return(
            <View>
                <WhiteSpace/>
                <Button type={'primary'} onClick={()=>{
                    this.props.navigation.navigate('AddSensor',{
                        navigation: this.props.navigation,
                        gardenId:this.state.gardenId,
                        onAddSensor:this.onAddSensor.bind(this)
                    })
                }}>
                    Add a sensor
            </Button>
                <WhiteSpace/>
                <ListView
                    dataSource={this.state.ds}
                    renderRow={(rowData)=>{
                        console.log('in render');
                        console.log(rowData);
                        let record=currentData+1;
                        if(record===this.state.dataLength){
                            currentData=0;
                            return <SensorItem
                                data={rowData}
                                navigation={this.props.navigation}
                                onDeleteSensor={this.onDeleteSensor.bind(this)}
                                isLast={true}
                            />;
                        }
                        else{
                            currentData=record;
                            return <SensorItem
                                data={rowData}
                                navigation={this.props.navigation}
                                onDeleteSensor={this.onDeleteSensor.bind(this)}
                                isLast={false}
                            />;
                        }
                    }}
                />

            </View>
        )
    }
}

export default Sensor;