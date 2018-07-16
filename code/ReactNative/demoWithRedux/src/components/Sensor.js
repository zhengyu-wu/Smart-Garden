import React from 'react';
import { Text, View,ListView } from 'react-native';
import { Card, WhiteSpace, WingBlank,Button,List,Switch,Toast} from 'antd-mobile-rn';
import {connect} from 'react-redux';
import axios from 'axios';
import SensorItem from './SensorItem';

const Item = List.Item;
const Brief = Item.Brief;


class Sensor extends React.Component{
    constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            gardenId:1,//todo gardenId应该是从上层组件传递的，此处为了便于测试与编写采用了固定值
            data:{},//data应该是从后端拿到的数据
            ds:ds,
            isLoading:true
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
                this.setState({
                    data:res.data,
                    ds:this.state.ds.cloneWithRows(tmpData),
                    isLoading:false
                });
            })
            .catch(err=>{
                Toast.info('Something wrong!');
                console.log('error');
                console.log(err);
                //todo 这里应该做出错的处理 页面跳转？
            })
    }

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
        return(
            <View>
                <ListView
                    dataSource={this.state.ds}
                    renderRow={(rowData)=>{
                        return <SensorItem data={rowData}/>;
                    }}
                />
            </View>
        )
    }
}

export default Sensor;