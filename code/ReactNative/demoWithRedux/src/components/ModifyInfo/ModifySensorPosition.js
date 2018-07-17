
import React from 'react';
import { ScrollView, Text ,View} from 'react-native';
import { Button, InputItem, List,WhiteSpace,Toast} from 'antd-mobile-rn';
import axios from 'axios';
import qs from "qs";



//todo 进阶需求 在用户修改位置时 下面有张图显示原来的位置和现在的位置
class ModifySensorPosition extends React.Component{
    constructor(props: any){
        super(props);
        this.state={
            positionX:this.props.navigation.state.params.positionX.toString(),
            positionY:this.props.navigation.state.params.positionY.toString(),
            sensorId:this.props.navigation.state.params.sensorId
        };
    }

    //todo 实际上在修改传感器的接口的时候是会受花园大小限制的 在这个组件中应该检查这个

    render(){
        return(
            <View>
                <WhiteSpace size={'lg'}/>
                <InputItem
                    clear
                    type="number"
                    value={this.state.positionX}
                    error={false}
                    onErrorClick={()=>{}}
                    onChange={(value)=>{
                        //todo 此处应该有判断花园限制的东西
                        this.setState({positionX:value})
                    }}
                    placeholder={'PositionX'}
                >X</InputItem>
                <InputItem
                    clear
                    type="number"
                    value={this.state.positionY}
                    error={false}
                    onErrorClick={()=>{}}
                    onChange={(value)=>{
                        //todo 此处应该有判断花园限制的东西
                        //todo 还无法对输入的东西包含字母进行处理
                        this.setState({positionY:value})
                    }}
                    placeholder={'PositionX'}
                >Y</InputItem>
                <WhiteSpace size={'lg'}/>
                <Button type={'primary'} onClick={()=>{
                    //send axios post
                    const params={
                        sensorId:this.state.sensorId,
                        positionX:this.state.positionX,
                        positionY:this.state.positionY
                    }
                    axios.post('http://192.168.56.1:8080/sensors/modifySensorPosition',qs.stringify(params))
                        .then(()=>{
                            Toast.success('modify position success');
                            this.props.navigation.state.params.onModifyPosition(this.state.positionX,this.state.positionY);
                            this.props.navigation.goBack();
                        })
                        .catch((err)=>{
                            Toast.fail('modify position error');
                            console.log(err);
                        })
                }}
                        disabled={this.state.positionX === '' || this.state.positionY === ''}>
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


export default ModifySensorPosition;