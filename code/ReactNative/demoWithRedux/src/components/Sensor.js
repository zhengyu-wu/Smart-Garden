import React from 'react';
import { Text, View,ListView,FlatList } from 'react-native';
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
        this.state={
            gardenId:this.props.navigation.state.params.gardenId,
            data:[],//data应该是从后端拿到的数据
            refreshing:false,
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
                        key:i.toString(),
                        sensor:{
                            sensorId:res.data[i].sensorId,
                            positionX:res.data[i].positionX,
                            positionY:res.data[i].positionY,
                            sensorState:res.data[i].sensorState,
                            sensorType:res.data[i].sensorType
                        }
                    });
                }
                this.setState({
                    data:tmpData,
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

    _renderItem=(item)=>{
        return <SensorItem
        data={item.item.sensor}
        navigation={this.props.navigation}
        onDeleteSensor={this.onDeleteSensor.bind(this)}
        />
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

    _footer = () => {
        return <Text>这是尾部</Text>;
    }

    _separator = () => {
        return <View style={{height:2}}/>;
    }

    render(){
        return(
            <View style={{flex:1}}>
                <FlatList
                    ref={(flatList)=>this._flatList=flatList}
                    ListHeaderComponent={this._header}
                    ListFooterComponent={this._footer}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    onEndReachedThreshold={0}
                    numColumns={1}
                    data={this.state.data}
                    extraData={this.state.data}
                    refreshing={this.state.refreshing}
                    onRefresh={()=>{
                        this.setState({refreshing:true});
                        axios.get("http://192.168.56.1:8080/sensors/getSensorByGardenId",{params:{gardenId:this.state.gardenId}})
                            .then((res)=>{
                                let tmpData=[];
                                for(let i=0;i<res.data.length;i++){
                                    tmpData.push({
                                        key:i.toString(),
                                        sensor:{
                                            sensorId:res.data[i].sensorId,
                                            positionX:res.data[i].positionX,
                                            positionY:res.data[i].positionY,
                                            sensorState:res.data[i].sensorState,
                                            sensorType:res.data[i].sensorType
                                        }
                                    });
                                }
                                this.setState({
                                    data:tmpData,
                                    refreshing:false
                                });
                            })
                            .catch(err=>{
                                Toast.info('Something wrong!');
                                console.log('error');
                                console.log(err);
                                this.setState({refreshing:false})
                                //todo 这里应该做出错的处理 页面跳转？
                            })
                    }}
                />
            </View>
        )
    }
}

export default Sensor;

