
import React from 'react';
import { ScrollView, Text ,View} from 'react-native';
import { Button, InputItem, List,WhiteSpace,Toast} from 'antd-mobile-rn';
import axios from 'axios';
import qs from "qs";
import {HOST_NAME} from "../../constants";



//todo 进阶需求 在用户修改位置时 下面有张图显示原来的位置和现在的位置
class ModifyNozzleRadius extends React.Component{
    constructor(props: any){
        super(props);
        this.state={
            oldRadius:this.props.navigation.state.params.radius.toString(),
            newRadius:this.props.navigation.state.params.radius.toString(),
            nozzleId:this.props.navigation.state.params.nozzleId
        };
    }

    //todo 实际上在修改传感器的接口的时候是会受花园大小限制的 在这个组件中应该检查这个

    render(){
        return(
            <View>
                <WhiteSpace size={'lg'}/>
                <List style={{ paddingTop: 120 }}>
                    
                    <InputItem
                        clear
                        type="number"
                        value={this.state.newRadius}
                        error={this.state.newRadius<=0||this.state.newRadius>10}
                        onErrorClick={()=>{}}
                        onChange={(value)=>{
                            //todo 此处应该有判断花园限制的东西
                            this.setState({newRadius:value})
                        }}
                        placeholder={'Radius of the nozzle'}
                    >Radius</InputItem>
                </List>
                <WhiteSpace size={'lg'}/>
                <Button type={'primary'} onClick={()=>{
                    //send axios post
                    const params={
                        nozzleId:this.state.nozzleId,
                        radius:this.state.newRadius
                    }
                    axios.post(HOST_NAME+'/nozzles/modifyRadiusByNozzleId',qs.stringify(params))
                        .then(()=>{
                            Toast.success('modify position success');
                            this.props.navigation.state.params.onModifyRadius(this.state.newRadius);
                            this.props.navigation.goBack();
                        })
                        .catch((err)=>{
                            Toast.fail('modify position error');
                            console.log(err);
                        })
                }}
                        disabled={this.state.positionX === ''||this.state.positionY === ''}>
                    Submit
                </Button>
                <WhiteSpace size={'lg'}/>
                <Button type={'primary'} onClick={()=>{
                    this.props.navigation.goBack();
                }}>
                    Cancel
                </Button>
            </View>
        )
    }
}


export default ModifyNozzleRadius;