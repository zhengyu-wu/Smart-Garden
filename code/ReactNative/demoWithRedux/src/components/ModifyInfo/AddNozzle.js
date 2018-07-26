
import React from 'react';
import { ScrollView, Text ,View} from 'react-native';
import { Button, InputItem, List,WhiteSpace,Toast,Picker,Switch} from 'antd-mobile-rn';
import axios from 'axios';
import qs from "qs";

class AddNozzle extends React.Component{
    constructor(props:any){
        super(props);
        this.state={
            radius:0,
            nozzleState:false,
            positionX:"",
            positionY:"",
            pickerValue:[]
        }
    }

    onSwitchChanged=()=>{
        this.setState({
            nozzleState:!this.state.nozzleState
        })
    };

    render() {

        //todo 下面还是有一些地方要改东西的 比如根据花园大小判断按钮是否生效

        return (
            <ScrollView
                style={{ flex: 1 }}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <List renderHeader={() => 'Add a nozzle'}>
                    <InputItem
                        clear
                        value={this.state.radius.toString()}
                        onChange={(value: any) => {
                            this.setState({
                                radius: value,
                            });
                        }}
                        placeholder="the radius of the nozzle"
                    >Radius</InputItem>
                    <InputItem
                        clear
                        value={this.state.positionX.toString()}
                        onChange={(value: any) => {
                            this.setState({
                                positionX: value,
                            });
                        }}
                        placeholder="the x position of the nozzle"
                    >X</InputItem>
                    <InputItem
                        clear
                        value={this.state.positionY.toString()}
                        onChange={(value: any) => {
                            this.setState({
                                positionY: value,
                            });
                        }}
                        placeholder="the y position of the nozzle"
                    >Y</InputItem>
                    <List.Item extra={
                        <Switch
                            checked ={this.state.nozzleState}
                            onChange={this.onSwitchChanged}
                        />
                    }
                    >
                        {this.state.nozzleState?'On':'Off'}
                    </List.Item>
                    <List.Item>
                        <Button
                            onClick={() => {
                                //提交数据
                                let tmpState= this.state.nozzleState?1:0;
                                const params={
                                    nozzleState:tmpState,
                                    positionX:this.state.positionX,
                                    positionY:this.state.positionY,
                                    radius:this.state.radius,
                                    gardenId:this.props.navigation.state.params.gardenId
                                };
                                console.log('params');
                                console.log(params);
                                axios.post('http://192.168.56.1:8080/nozzles/addNozzleByGardenId',qs.stringify(params))
                                    .then(()=>{
                                        //todo  此处应当调用父组件的接口 修改父组件的state
                                        this.props.navigation.state.params.onAddNozzle();
                                        Toast.success('add successfully');
                                        this.props.navigation.goBack();
                                    })
                                    .catch((err)=>{
                                        Toast.fail('something wrong');
                                        console.log('in err adda nozzle');
                                        console.log(err);
                                    })
                            }}
                            type="primary"
                            disabled={this.state.radius===0
                            ||this.state.positionX===""||this.state.positionY===""
                            }
                        >
                            submit
                        </Button>
                    </List.Item>
                    <List.Item>
                        <Button
                            onClick={() => {
                                //返回前一个页面
                                this.props.navigation.goBack()
                            }}
                            type="primary"
                        >
                            cancel
                        </Button>
                    </List.Item>
                </List>
            </ScrollView>
        );
    }
}

export default AddNozzle;