import React from 'react';
import { Text, View,ListView } from 'react-native';
import { Card, WhiteSpace, WingBlank,Button,List,Switch,Toast,Modal} from 'antd-mobile-rn';
import axios from 'axios';
import qs from 'qs';
import {HOST_NAME} from "../constants";

const Item = List.Item;
const Brief = Item.Brief;


//sensor列表的每一个最小单位
class SensorItem extends React.Component{
    constructor(props:any){
        super(props);
        this.state={
            checked:false,
            positionX:this.props.navigation.state.params.data.positionX,
            positionY:this.props.navigation.state.params.data.positionY,
            sensorId:this.props.navigation.state.params.data.sensorId,
            visible:false
        };
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    componentDidMount(){
        if(this.props.navigation.state.params.data.sensorState===1)
            this.setState({checked:true});
        this.setState({positionX:this.props.navigation.state.params.data.positionX,
            positionY:this.props.navigation.state.params.data.positionY,
            sensorId:this.props.navigation.state.params.data.sensorId,});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            checked:nextProps.data.sensorState===1,
            positionX:nextProps.data.positionX,
            positionY:nextProps.data.positionY,
            sensorId:nextProps.data.sensorId,
            visible:false
        })
    }

    onSwitchChanged=() => {
        let tmpState = 0;
        if (this.state.checked === false) {
            tmpState = 1;
        }
        this.setState({checked: !this.state.checked});

        const params = {
            sensorId: this.state.sensorId,
            sensorState: tmpState
        };
        axios.post(HOST_NAME+'/sensors/modifySensorState', qs.stringify(params))
            .catch(()=>
            {
                Toast.fail("unable to change the state");
            })
    };

    onModifyPosition=(positionX,positionY)=>{
        this.setState({positionX:positionX,positionY:positionY})
    };

    onButtonClick = () => {
        Modal.alert('Delete this sensor?', 'the operation cannot be recovered', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
            {
                text: 'OK', onPress: () => {
                    this.props.navigation.state.params.onDeleteSensor(this.props.navigation.state.params.data.sensorId)
                    this.props.navigation.goBack()
                }
            },

        ]);
    };

    render(){
        return  <Card style={{ paddingTop: 160 }}>
                    <Card.Body>
                        <List>
                            <Item extra={this.props.navigation.state.params.data.sensorId} arrow={'empty'}>
                                Sensor ID
                            </Item>
                            <Item extra={this.props.navigation.state.params.data.sensorType} arrow={'empty'}>
                                Sensor type
                            </Item>
                            <Item extra={'('+this.state.positionX+','+this.state.positionY+')'}
                                  arrow={'horizontal'}
                                  onClick={()=>{
                                      this.props.navigation.navigate('ModifySensorPosition',
                                          {
                                              navigation: this.props.navigation,
                                              positionX:this.state.positionX,
                                              positionY:this.state.positionY,
                                              sensorId:this.state.sensorId,
                                              onModifyPosition:this.onModifyPosition.bind(this)
                                          })
                            }}>
                                Position
                            </Item>
                            <Item arrow={'horizontal'} 
                                onClick={()=>{
                                this.props.navigation.navigate('Linechart',
                                              {
                                                  navigation: this.props.navigation,
                                                  sensorId:this.state.sensorId
                                              })
                            }}>
                                View data
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
                        <Button type={'warning'} onClick={()=>
                        {
                            this.setState({ visible: true });
                            this.onButtonClick();
                        }
                        }>Delete this sensor</Button>
                    </Card.Body>
                </Card>

    }
}

export default SensorItem;