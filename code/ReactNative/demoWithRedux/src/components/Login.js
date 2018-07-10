import React from 'react';
import { Text, View ,TextInput} from 'react-native';
import { connect } from 'react-redux';
import {get_user} from '../actions';
import {Button,List,InputItem} from 'antd-mobile-rn';

class Login extends React.Component{
    constructor(){
        super();
        this.state={
            email:"",
            password:""
        };
    }
    render(){
        const {get_user} = this.props;
        return(
            <View >
                <Text h4>Student Login</Text>
                <List>
                    <InputItem
                        clear
                        value={this.state.email}
                        onChange={(value)=>{
                        this.setState({email:value})}
                        }
                        placeholder={"Email"}
                    >
                    邮箱
                    </InputItem>
                    <InputItem
                        clear
                        type={"password"}
                        value={this.state.password}
                        onChange={
                            (value)=>{
                                this.setState({password:value})}
                        }
                        placeholder={"password"}>
                        密码
                    </InputItem>
                </List>
                <Button
                    type={'primary'}
                    onClick={() => get_user(this.state.email,this.state.password)}>
                    Login
                </Button>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, {get_user})(Login);