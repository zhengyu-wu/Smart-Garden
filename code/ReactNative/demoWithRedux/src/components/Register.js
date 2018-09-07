import React from 'react';
import { ScrollView, Text ,View} from 'react-native';
import { Button, InputItem, List,WhiteSpace,Toast} from 'antd-mobile-rn';
import {register} from "../actions";
import { connect } from 'react-redux';
import Login from './Login';
import axios from "axios/index";
import {HOST_NAME} from "../constants";

class Register extends React.Component{
    constructor(props: any) {
        super(props);
        this.state = {
            username:"",
            phone:"",
            email:"",
            password:"",
            confirmPassword:"",
            phoneError:false,
            passwordError:false,
            emailError:false,
            checkCode:0,
            confirmCheckCode:0,
            checkError:true
        };
        this.onPhoneErrorClick=this.onPhoneErrorClick.bind(this);
        this.onPasswordErrorClick=this.onPasswordErrorClick.bind(this);
        this.onEmailErrorClick=this.onEmailErrorClick.bind(this);
    }

    onPhoneErrorClick=()=>{
        if(this.state.phoneError)
            Toast.info('Please enter 11 digits',1);
    };
    onPasswordErrorClick=()=>{
        if(this.state.passwordError)
            Toast.info('two passwords differ',1);
    };
    onEmailErrorClick=()=>{
        if(this.state.emailError)
            Toast.info('Please enter a valid email',1);
    };
    onCheckErrorClick=()=>{
        if(this.state.checkError)
            Toast.info('Please check the code again')
    }
    onSendCheckCode=()=>{
        if(this.state.email.toString().length>0){
            axios.get(HOST_NAME+"/email/sendEmail",{params:{recv:this.state.email}})
                .then((res)=>{
                    if(res.data!==-1){
                        this.setState({checkCode:res.data})
                    }
                    else{
                        Toast.info('There is an issue with email service, please try it again later');
                    }
                })
        }
    }

    render(){
        const {register}=this.props;
        const { navigate } = this.props.navigation;
            return(
                <View style={{ paddingTop: 120 }}>
                    <ScrollView
                        automaticallyAdjustContentInsets={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <List renderHeader={()=>'Register'}>
                            <InputItem
                                clear
                                value={this.state.username}
                                onChange={(value: any) => {
                                    this.setState({
                                        username: value,
                                    });
                                }}
                                placeholder="username"
                            >
                            </InputItem>
                            <InputItem
                                clear
                                type="phone"
                                value={this.state.phone}
                                error={this.state.phoneError}
                                onErrorClick={this.onPhoneErrorClick}
                                onChange={(value) => {
                                    if(value.replace(/\s/g,'').length<11)
                                        this.setState({
                                            phone: value,
                                            phoneError:true
                                        });
                                    else {
                                        this.setState({
                                            phone: value,
                                            phoneError:false
                                        });
                                    }
                                }}
                                placeholder="phone"
                            >
                            </InputItem>
                            <InputItem
                                clear
                                type={"text"}
                                value={this.state.email}
                                error={this.state.emailError}
                                onErrorClick={this.onEmailErrorClick}
                                onChange={(value)=>{
                                    if(value.indexOf("@")>0){
                                        this.setState({
                                            email:value,
                                            emailError:false
                                        })
                                    }
                                    else{
                                        this.setState({
                                            email:value,
                                            emailError:true
                                        })
                                    }
                                }}
                                placeholder={'email'}
                            >

                            </InputItem>
                            <InputItem
                                clear
                                type="password"
                                value={this.state.password}
                                onChange={(value: any) => {
                                    this.setState({
                                        password: value,
                                    });
                                }}
                                placeholder="password"
                            >
                            </InputItem>
                            <InputItem
                                clear
                                type="password"
                                value={this.state.confirmPassword}
                                error={this.state.passwordError}
                                onErrorClick={this.onPasswordErrorClick}
                                onChange={(value: any) => {
                                    if(value===this.state.password){
                                        this.setState({
                                            confirmPassword: value,
                                            passwordError:false
                                        });
                                    }
                                    else{
                                        this.setState({
                                            confirmPassword: value,
                                            passwordError:true
                                        });
                                    }
                                }}
                                placeholder="confirm password"
                            >
                            </InputItem>
                            <List.Item>{
                                <Button
                                    onClick={
                                        ()=>{this.onSendCheckCode()}
                                    }
                                    disabled={this.state.emailError||this.state.email===""}
                                >
                                    Send verification code to email
                                </Button>}
                                </List.Item>
                            <InputItem
                                clear
                                type={"text"}
                                value={this.state.checkCode}
                                error={this.state.checkError}
                                onErrorClick={this.onCheckErrorClick}
                                onChange={(value: any) => {
                                    this.setState({
                                        checkCode: value,
                                        checkError:value!==this.state.checkCode
                                    });
                                }}
                                placeholder="the code you got"
                            />
                        </List>
                    </ScrollView>
                    <WhiteSpace size="lg" />
                    <Button type={'primary'}
                            onClick={
                                ()=>{
                                    register(this.state.username,
                                    this.state.phone.replace(/\s/g,''),
                                    this.state.email,
                                    this.state.password);
                                    if(typeof (this.props.navigation.state.params.onAddUser)!=='undefined'){
                                        this.props.navigation.state.params.onAddUser();
                                    }
                                    this.props.navigation.goBack();
                                }
                            }
                            disabled={this.state.emailError||this.state.passwordError||this.state.phoneError
                            ||this.state.checkError||this.state.email===""||this.state.password===""
                            ||this.state.phone===""}
                    >
                        Register
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

export default connect(mapStateToProps,{register})(Register);