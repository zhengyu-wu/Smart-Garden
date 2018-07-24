import React from 'react';
import { Text, View,ListView } from 'react-native';
import { Card, WhiteSpace, WingBlank,Button,List,Switch,Toast,Modal} from 'antd-mobile-rn';
import axios from 'axios';
import qs from 'qs';

const Item = List.Item;
const Brief = Item.Brief;


//sensor列表的每一个最小单位
class SensorItem extends React.Component{
    constructor(props:any){
        super(props);
        this.state={
            checked:false,
            positionX:this.props.data.positionX,
            positionY:this.props.data.positionY,
            sensorId:this.props.data.sensorId,
            visible:false
        };
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    componentDidMount(){
        if(this.props.data.sensorState===1)
            this.setState({checked:true});
        this.setState({positionX:this.props.data.positionX,
            positionY:this.props.data.positionY,
            sensorId:this.props.data.sensorId,});
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
        axios.post('http://192.168.56.1:8080/sensors/modifySensorState', qs.stringify(params))
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
                    console.log(this.state.sensorId);
                    const params = {
                        sensorId: this.state.sensorId
                    };
                    axios.post('http://192.168.56.1:8080/sensors/deleteSensorBySensorId', qs.stringify(params))
                        .then(() => {
                            Toast.info('successfully delete');
                            this.props.onDeleteSensor();
                        });
                }
            }

        ]);
    };

    render(){
        return  <Card>
                    <Card.Body>
                        <List>
                            <Item extra={this.props.data.sensorId} arrow={'empty'}>
                                sensor id
                            </Item>
                            <Item extra={this.props.data.sensorType} arrow={'empty'}>
                                sensor type
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
                                position
                            </Item>
                            <Item arrow={'horizontal'} 
                                onClick={()=>{
                                this.props.navigation.navigate('Linechart',
                                              {
                                                  navigation: this.props.navigation
                                                  //gardenId:this.props.data.gardenId
                                              })
                            }}>
                                实时折线图
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