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
            positionY:-1,
            gardenNameError:false,
            posXError:false,
            posYError:false,
            widthError:false,
            lengthError:false
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
                <List style={{ paddingTop: 120 }}>
                    <InputItem
                        clear
                        error={this.state.gardenNameError}
                        onErrorPress={() =>{
                            if(this.state.gardenNameError)
                            Toast.info('Please enter a valid name',1);
                        }}
                        value={this.state.gardenName}
                        onChange={(value: any) => {
                            this.setState({
                                gardenName:value,
                                gardenNameError: value.toString().length<=0
                            });
                        }}
                        placeholder="The name of garden"
                    >
                        Name
                    </InputItem>
                    <InputItem
                        clear
                        error={this.state.posXError}
                        value={this.state.positionX}
                        onErrorPress={() =>{
                            if(this.state.posXError)
                                Toast.info('Please enter a position larger than 0',1);
                        }}
                        onChange={(value: any) => {
                            this.setState({
                                positionX: value,
                                posXError:value<=0
                            });
                        }}
                        placeholder="the position of garden"
                    >Pos X</InputItem>
                    <InputItem
                        clear
                        value={this.state.positionY}
                        error={this.state.posYError}
                        onErrorPress={() =>{
                            if(this.state.posYError)
                                Toast.info('Please enter a position larger than 0',1);
                        }}
                        onChange={(value: any) => {
                            this.setState({
                                positionY: value,
                                posYError:value<=0
                            });
                        }}
                        placeholder="the position of garden"
                    >Pos Y</InputItem>
                    <InputItem
                        clear
                        value={this.state.width}
                        error={this.state.widthError}
                        onErrorPress={() =>{
                            if(this.state.widthError)
                                Toast.info('Please enter a width larger than 0',1);
                        }}
                        onChange={(value: any) => {
                            this.setState({
                                width: value,
                                widthError:value.toString().length<=0
                            });
                        }}
                        placeholder="the width of garden"
                    >Width</InputItem>
                    <InputItem
                        clear
                        value={this.state.length}
                        error={this.state.lengthError}
                        onErrorPress={() =>{
                            if(this.state.lengthError)
                                Toast.info('Please enter a length larger than 0',1);
                        }}
                        onChange={(value: any) => {
                            this.setState({
                                length: value,
                                lengthError:value<=0
                            });
                        }}
                        placeholder="the length of garden"
                    >Length</InputItem>
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
                                };
                                console.log("in add garden params: "+params);
                                axios.post(HOST_NAME+'/garden/addGardenWithUserId',qs.stringify(params))
                                    .then(()=>{
                                        //todo  此处应当调用父组件的接口 修改父组件的state
                                        console.log(this.props.navigation.state.params);
                                        this.props.navigation.state.params.update();
                                        Toast.success('Add the garden successfully!');
                                        this.props.navigation.goBack();
                                    })
                            }}
                            type="primary"
                            disabled={this.state.gardenNameError||this.state.lengthError
                            ||this.state.posXError||this.state.posYError
                            ||this.state.widthError||this.state.length===0
                            ||this.state.width===0||this.state.positionX===0
                            ||this.state.positionY===0}
                        >
                            Submit
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
                            Cancel
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