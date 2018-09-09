import React from 'react';
import { Text, View,FlatList } from 'react-native';
import { Card, WhiteSpace, WingBlank,Button,List,Switch,Toast,Grid} from 'antd-mobile-rn';
import axios from 'axios';
import NozzleItem from './NozzleItem';
import qs from "qs";
import _ from 'lodash';
import {HOST_NAME} from "../constants";

const Item = List.Item;
const Brief = Item.Brief;


class Nozzle extends React.Component{
    constructor(props:any){
        super(props);
        this.state={
            gardenId:this.props.navigation.state.params.gardenId,
            overlay: [],
            nozzleData:[]
        }
    }

    //因为这个组件的data这个state并不会在很多组件之间传递，所以不需要采用redux保存状态
    componentWillMount(){
        axios.get(HOST_NAME+"/nozzles/getNozzleByGardenId",{params:{gardenId:this.state.gardenId}})
            .then((res)=>{
                let nozzleData=[];
                let tmp_overlay = [];
                for(let i=0;i<res.data.length;i++){

                    tmp_overlay.push(res.data[i].nozzleId);

                    nozzleData.push({                       
                            nozzleId:res.data[i].nozzleId,
                            positionX:res.data[i].positionX,
                            positionY:res.data[i].positionY,
                            nozzleState:res.data[i].nozzleState,
                            radius:res.data[i].radius
                        
                    });
                }
                this.setState({
                    overlay: tmp_overlay,
                    nozzleData: nozzleData
                });
            })
            .catch(err=>{
                Toast.info('Something wrong!');
                console.log('error');
                console.log(err);
                //todo 这里应该做出错的处理 页面跳转？
            })
    }

    onDeleteNozzle=()=>{
        this.componentWillMount();
    };
    onAddNozzle=()=>{
        this.componentWillMount();
    };


/*
    _renderItem=(item)=>{
        return <NozzleItem
            data={item.item.nozzle}
            navigation={this.props.navigation}
            onDeleteNozzle={this.onDeleteNozzle.bind(this)}
        />
    }

    _header = () => {
        return <Button type={'primary'}
                       onClick={()=>
                       {//todo
                           this.props.navigation.navigate('AddNozzle',{
                               navigation: this.props.navigation,
                               gardenId:this.state.gardenId,
                               onAddNozzle:this.onAddNozzle.bind(this)
                           })
                       }
                       }>
            Add nozzle
        </Button>;
    }

    _footer = () => {
        return <Text>这是尾部</Text>;
    }

    _separator = () => {
        return <View style={{height:2}}/>;
    }*/

    render(){

        data = this.state.overlay.map((i, index) => ({
            icon: '/Users/wuzhengyu/Desktop/demoWithRedux/src/assets/nozzle.png',
            text: `Nozzle ${i}`,
        }));

        return(
            <View style={{ paddingTop: 100 }}>
                <Grid
                data={data}
                columnNum={3}
                carouselMaxRow={3}
                isCarousel          
                onClick={(_el: any, index: any)=>{
                    this.props.navigation.navigate('NozzleItem',
                          {
                              navigation: this.props.navigation,
                              data: this.state.nozzleData[index],
                              onDeleteNozzle:this.onDeleteNozzle.bind(this)
                          })
                }} 
                />
                <Button style={{ top: 80 }} type={'primary'} onClick={()=>{
                    this.props.navigation.navigate('AddNozzle',
                    {
                        update:this.componentWillMount.bind(this),
                        data: this.state.gardenId
                    })
                    }
                }>
                Add a nozzle
                </Button>
            </View>
        )
    }
}

export default Nozzle;

