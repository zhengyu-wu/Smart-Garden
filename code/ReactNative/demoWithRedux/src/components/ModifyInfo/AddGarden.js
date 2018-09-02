import React from 'react';
import { ScrollView, Text ,View} from 'react-native';
import { Button, InputItem, List,WhiteSpace,Toast} from 'antd-mobile-rn';
import axios from 'axios';
import qs from "qs";
import {connect} from "react-redux";
import {HOST_NAME} from "../../constants";


class AddGarden extends React.Component{
    constructor(props:any){
        super(props);
        this.state={
            gardenName:'',
            width:0,
            length:0,
            positionX:-1,
            positionY:-1
        }
    }

    render() {
        return (
            <ScrollView
                style={{ flex: 1 }}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <List renderHeader={() => 'Add a garden'}>
                    <InputItem
                        clear
                        error
                        onErrorPress={() =>{}}
                        value={this.state.gardenName}
                        onChange={(value: any) => {
                            this.setState({
                                gardenName:value
                            });
                        }}
                        placeholder=""
                    >
                        Garden Name
                    </InputItem>
                    <InputItem
                        clear
                        value={this.state.positionX}
                        onChange={(value: any) => {
                            this.setState({
                                positionX: value,
                            });
                        }}
                        placeholder=""
                    >position X</InputItem>
                    <InputItem
                        clear
                        value={this.state.positionY}
                        onChange={(value: any) => {
                            this.setState({
                                positionY: value,
                            });
                        }}
                        placeholder=""
                    >position Y</InputItem>
                    <InputItem
                        clear
                        value={this.state.width}
                        onChange={(value: any) => {
                            this.setState({
                                width: value,
                            });
                        }}
                        placeholder=""
                    >width</InputItem>
                    <InputItem
                        clear
                        value={this.state.length}
                        onChange={(value: any) => {
                            this.setState({
                                length: value,
                            });
                        }}
                        placeholder=""
                    >length</InputItem>
                    <List.Item>
                        <Button
                            onClick={() => {
                                //提交数据
                                const params={
                                    gardenName:this.state.gardenName,
                                    positionX:this.state.positionX,
                                    positionY:this.state.positionY,
                                    width:this.state.width,
                                    length:this.state.length,
                                    userId:this.props.user.user.userId
                                }
                                axios.post(HOST_NAME+'/garden/addGardenWithUserId',qs.stringify(params))
                                    .then(()=>{
                                        //todo  此处应当调用父组件的接口 修改父组件的state
                                    })
                            }}
                            type="primary"
                            disabled={this.state.gardenName===""||this.state.length===0
                            ||this.state.positionX===-1||this.state.positionY===-1
                            ||this.state.width===0}
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

mapStateToProps= (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(AddGarden);