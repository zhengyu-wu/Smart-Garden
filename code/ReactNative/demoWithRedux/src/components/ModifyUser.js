import React from 'react';
import { ScrollView, Text ,View} from 'react-native';
import { Button, InputItem, List,WhiteSpace,Toast} from 'antd-mobile-rn';
import {modifyUser} from "../actions";
import { connect } from 'react-redux';


//todo 其实这个组件已经不会再被使用了
class ModifyUser extends React.Component{
    constructor(props: any) {
        super(props);
        this.state = {
            username:this.props.user.user.username,
            phone:this.props.user.user.phone,
            email:this.props.user.user.email,
            password:"",
            confirmPassword:"",
            phoneError:false,
            passwordError:false,
            emailError:false
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

    render(){
        const {modifyUser}=this.props;
        return(
            <View>
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
                    </List>
                </ScrollView>
                <WhiteSpace size="lg" />
                <Button type={'primary'}
                        onClick={
                            ()=>{
                                modifyUser(
                                    this.props.user.user.userId,
                                    this.props.user.user.userType,
                                    this.state.username,
                                    this.state.phone,
                                    this.state.email,
                                    this.state.password);
                               this.props.navigation.goBack();
                            }
                        }
                >
                    Submit
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

export default connect(mapStateToProps,{modifyUser})(ModifyUser);