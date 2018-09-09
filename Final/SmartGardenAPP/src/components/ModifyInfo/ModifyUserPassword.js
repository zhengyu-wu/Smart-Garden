import React from 'react';
import { ScrollView, Text ,View} from 'react-native';
import { Button, InputItem, List,WhiteSpace,Toast} from 'antd-mobile-rn';
import {modifyUser} from "../../actions";
import { connect } from 'react-redux';

class ModifyUserPassword extends React.Component{
    constructor(props: any){
        super(props);
        this.state={
            oldPassword:"",
            password:"",
            confirmPassword:"",
            passwordError:false,
            oldPasswordError:false
        }
    }
    onPasswordErrorClick=()=>{
        if(this.state.passwordError)
            Toast.info('two passwords differ',1);
    };

    onOldPasswordErrorClick=()=>{
        if(this.state.oldPasswordError)
            Toast.fail('old password error',1);
    }

    render(){
        const {modifyUser}=this.props;

        return(
            <View style={{ paddingTop: 120 }}>
                <WhiteSpace size={'lg'}/>
                <List>
                <InputItem 
                    clear
                    type="password"
                    value={this.state.oldPassword}
                    error={this.state.oldPasswordError}
                    onErrorClick={this.onOldPasswordErrorClick}
                    onChange={
                        (value)=>{
                            if(value!=this.props.user.user.password){
                                this.setState({oldPassword:value,oldPasswordError:true})
                            }
                            else {
                                this.setState({oldPassword:value,oldPasswordError:false})
                            }
                        }
                    }
                    placeholder={'Enter your old password'}
                />
                <InputItem 
                    clear
                    type="password"
                    value={this.state.password}
                    onChange={
                        (value)=>{
                            this.setState({password:value})
                        }
                    }
                    placeholder={'Enter your new password'}
                />
                <InputItem 
                    clear
                    type="password"
                    value={this.state.confirmPassword}
                    error={this.state.passwordError}
                    onErrorClick={this.onPasswordErrorClick}
                    onChange={
                        (value)=>{
                            if(value!==this.state.password)
                            {
                                this.setState({passwordError:true,confirmPassword:value});
                            }
                            else{
                                this.setState({passwordError:false,confirmPassword:value});
                            }
                        }
                    }
                    placeholder={'Confirm your new password'}
                />
                </List>
                <WhiteSpace size={'s'}/>
                <Button style={{top: 50}} type={'primary'} onClick={()=>{
                    modifyUser(
                        this.props.user.user.userId,
                        this.props.user.user.userType,
                        this.props.user.user.username,
                        this.props.user.user.phone,
                        this.props.user.user.email,
                        this.state.password);
                    this.props.navigation.goBack();
                }}
                        disabled={
                            (this.state.passwordError)
                            || this.state.password === ''
                            || this.state.confirmPassword === ''
                            || this.state.oldPassword !== this.props.user.user.password
                        }>
                    Submit
                </Button>
                <WhiteSpace size={'lg'}/>
                <Button style={{top: 50}} type={'primary'} onClick={()=>{
                    this.props.navigation.goBack();
                }}>
                    Cancel
                </Button>
            </View>
        )
    }
}

mapStateToProps= (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps,{modifyUser})(ModifyUserPassword);