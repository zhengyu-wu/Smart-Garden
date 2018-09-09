import React from 'react';
import { Text, View ,TextInput,Image} from 'react-native';
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
        //todo 下面的图片采用flex布局
    }
    render(){
        const {get_user} = this.props;
        return(
            <View >
                <Image
                    source={require('../assets/logo.png')}
                    style={{left:70,bottom:40,width: 220, height: 220, alignItems:'center',justifyContent: 'center'}}
                />
                <List>
                    <InputItem 
                        clear
                        value={this.state.email}
                        onChange={(value)=>{
                            this.setState({email:value})}
                        }
                        placeholder={"Email"}
                    >
                        
                    </InputItem>
                    <InputItem 
                        clear
                        type={"password"}
                        value={this.state.password}
                        onChange={
                            (value)=>{
                                this.setState({password:value})}
                        }
                        placeholder={"Password"}>
                        
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