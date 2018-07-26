import React from 'react';
import { ScrollView, Text ,View} from 'react-native';
import { Button, InputItem, List,WhiteSpace,Toast} from 'antd-mobile-rn';
import {modifyUser} from "../../actions";
import { connect } from 'react-redux';

class ModifyUserPhoneAdmin extends React.Component{
    constructor(props: any){
        super(props);
        this.state={
            phone:this.props.navigation.state.params.item.user.phone
        }
    }

    render(){
        return(
            <View>
                <WhiteSpace size={'lg'}/>
                <List>
                    <InputItem
                        clear
                        value={this.state.phone}
                        onChange={
                            (value)=>{
                                this.setState({phone:value})
                            }
                        }
                        placeholder={'username'}
                    />
                </List>
                <WhiteSpace size={'lg'}/>
                <Button type={'primary'} onClick={()=>{
                    this.props.navigation.state.params.onModifyInfo(
                        this.props.navigation.state.params.item.user.userId,
                        this.props.navigation.state.params.item.user.userType,
                        this.props.navigation.state.params.item.user.username,
                        this.state.phone,
                        this.props.navigation.state.params.item.user.email,
                        this.props.navigation.state.params.item.user.password,
                        this.props.navigation.state.params.item.user.userState);
                    this.props.navigation.goBack();
                }}
                        disabled={this.state.phone===''? true:false}>
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


export default ModifyUserPhoneAdmin;