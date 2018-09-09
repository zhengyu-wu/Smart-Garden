import React from 'react';
import { Text, View,ListView } from 'react-native';
import { Card, WhiteSpace, WingBlank,Button,List,Switch,Toast,Modal} from 'antd-mobile-rn';
import axios from 'axios';
import qs from 'qs';
import {HOST_NAME} from "../constants";

const Item = List.Item;
const Brief = Item.Brief;


//sensor列表的每一个最小单位
class NozzleItem extends React.Component{
    constructor(props:any){
        super(props);
        this.state={
            checked:this.props.navigation.state.params.data.nozzleState===1,
            positionX:this.props.navigation.state.params.data.positionX,
            positionY:this.props.navigation.state.params.data.positionY,
            nozzleId:this.props.navigation.state.params.data.nozzleId,
            radius:this.props.navigation.state.params.data.radius,
            visible:false
        };
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    // componentDidMount(){
    //     if(this.props.data.sensorState===1)
    //         this.setState({checked:true});
    //     this.setState({positionX:this.props.data.positionX,
    //         positionY:this.props.data.positionY,
    //         sensorId:this.props.data.sensorId,});
    // }
    //
    // componentWillReceiveProps(nextProps){
    //     this.setState({
    //         checked:nextProps.data.sensorState===1,
    //         positionX:nextProps.data.positionX,
    //         positionY:nextProps.data.positionY,
    //         sensorId:nextProps.data.sensorId,
    //         visible:false
    //     })
    // }

    onSwitchChanged=() => {
        let tmpState = 0;
        if (this.state.checked === false) {
            tmpState = 1;
        }
        this.setState({checked: !this.state.checked});

        const params = {
            nozzleId: this.state.nozzleId,
            state: tmpState
        };
        axios.post(HOST_NAME+'/nozzles/modifyStateByNozzleId', qs.stringify(params))
            .catch(()=>
            {
                Toast.fail("unable to change the state");
            })
    };

    onModifyPosition=(positionX,positionY)=>{
        this.setState({positionX:positionX,positionY:positionY})
    };
    onModifyRadius=(radius)=>{
        this.setState({radius:radius})
    }

    onButtonClick = () => {
        Modal.alert('Delete this nozzle?', 'the operation cannot be recovered', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
            {
                text: 'OK', onPress: () => {
                    console.log(this.state.nozzleId);
                    const params = {
                        nozzleId: this.state.nozzleId
                    };
                    axios.post(HOST_NAME+'/nozzles/deleteNozzleByNozzleId', qs.stringify(params))
                        .then(() => {
                            Toast.info('Deleted successfully!');
                            this.props.navigation.state.params.onDeleteNozzle();
                        });
                    this.props.navigation.goBack();
                }
            }
        ]);
    };

    render(){
        return  <Card style={{ paddingTop: 160 }}>
            <Card.Body>
                <List>
                    <Item extra={this.state.nozzleId} arrow={'empty'}>
                        Nozzle ID
                    </Item>
                    <Item extra={this.state.radius}
                          arrow={'horizontal'}
                          onClick={()=>{
                              //todo
                              this.props.navigation.navigate('ModifyNozzleRadius',
                                  {
                                      navigation: this.props.navigation,
                                      radius:this.state.radius,
                                      nozzleId:this.state.nozzleId,
                                      onModifyRadius:this.onModifyRadius.bind(this)
                                  })
                          }}
                        >
                        Radius
                    </Item>
                    <Item extra={'('+this.state.positionX+','+this.state.positionY+')'}
                          arrow={'horizontal'}
                          onClick={()=>{
                              this.props.navigation.navigate('ModifyNozzlePosition',
                                  {
                                      navigation: this.props.navigation,
                                      positionX:this.state.positionX,
                                      positionY:this.state.positionY,
                                      nozzleId:this.state.nozzleId,
                                      onModifyPosition:this.onModifyPosition.bind(this)
                                  })
                          }}>
                        Position
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
                }>Delete this nozzle</Button>
            </Card.Body>
        </Card>

    }
}

export default NozzleItem;