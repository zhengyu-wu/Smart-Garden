import React from 'react';
import { Text, View,ListView } from 'react-native';
import { Card, WhiteSpace, WingBlank,Button,List,Switch,Toast, Modal} from 'antd-mobile-rn';
import {connect} from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import Sensor from './Sensor';
import CameraExample from './Camera';
import GardenDiagram from './GardenDiagram';
import Heatmap from './Heatmap';
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
  
    componentWillReceiveProps(newProps)
    {

    }

    onButtonClick = () => {
        Modal.alert('Delete this garden?', 'the operation cannot be recovered', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
            { text: 'OK', onPress: () => {
                    this.props.navigation.state.params.onDeleteGarden(this.props.navigation.state.params.data.gardenId)
                    this.props.navigation.goBack()
                } },
        ]);
    };

    render(){
        return(
            <WingBlank style={{ paddingTop: 70 }} size="lg">
                <Card>
                    <Card.Body>
                        <List>
                            <Item extra={this.props.navigation.state.params.data.gardenId} arrow={'empty'}>
                                Garden Id
                            </Item>
                            <Item extra={this.props.navigation.state.params.data.gardenName} arrow={'empty'}>
                                Garden Name
                            </Item>
                            <Item extra={'('+this.props.navigation.state.params.data.positionX+','+this.props.navigation.state.params.data.positionY+')'} arrow={'empty'}>
                                Position
                            </Item>
                            <Item extra={this.props.navigation.state.params.data.length} arrow={'empty'} >
                                Length
                            </Item>
                            <Item  extra={this.props.navigation.state.params.data.width} arrow={'empty'} >
                                Width
                            </Item>
                            <Item arrow={'horizontal'} 
                                onClick={()=>{
                                this.props.navigation.navigate('Sensor',
                                              {
                                                  navigation: this.props.navigation,
                                                  gardenId:this.props.navigation.state.params.data.gardenId
                                              })
                            }}>
                                Sensors
                            </Item>
                            <Item arrow={'horizontal'}
                                  onClick={()=>{
                                      this.props.navigation.navigate('Nozzle',
                                          {
                                              navigation: this.props.navigation,
                                              gardenId:this.props.navigation.state.params.data.gardenId
                                          })
                                  }}>
                               Nozzles
                            </Item>
                            <Item arrow={'horizontal'} 
                                onClick={()=>{
                                this.props.navigation.navigate('GardenDiagram',
                                              {
                                                  navigation: this.props.navigation,
                                                  gardenId:this.props.navigation.state.params.data.gardenId
                                              })
                            }}>
                                Garden Diagram
                            </Item>
                            <Item arrow={'horizontal'} 
                                onClick={()=>{
                                this.props.navigation.navigate('Heatmap',
                                              {
                                                  navigation: this.props.navigation,
                                                  gardenId:this.props.navigation.state.params.data.gardenId
                                              })
                            }}>
                                Garden Heatmap
                            </Item>
                            <Item arrow={'horizontal'}
                                  onClick={()=>{
                                      this.props.navigation.navigate('CameraExample',
                                          {
                                              navigation: this.props.navigation
                                          })
                                  }}>
                               Camera
                            </Item>
                            <Item arrow={'horizontal'}
                                  onClick={()=>{
                                      this.props.navigation.navigate('WaterConfig',
                                          {
                                              navigation: this.props.navigation,
                                              gardenId:this.props.navigation.state.params.data.gardenId
                                          })
                                  }}>
                                Auto watering
                            </Item>
                        </List>
                        <Button type={'warning'} onClick={()=>
                        {
                            this.setState({ visible: true });
                            this.onButtonClick();
                        }
                        }>Delete this garden</Button>
                    </Card.Body>
                </Card>
            </WingBlank>
        )
    }
}

export default GardenItem;