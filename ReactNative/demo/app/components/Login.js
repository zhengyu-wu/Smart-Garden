import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text, TextInput,
    View
} from 'react-native';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            text:''
        };
    }

    render(){
        return (
            <View style={{padding:10}}>
                <TextInput
                    style={{height:40}}
                    placeholder={"UserId"}
                    onChangeText={(text) => this.setState({text})}
                />
                <Text style={{padding:10,fontSize:42}}>
                    {this.state.text}
                </Text>
            </View>
        )
    }
}

export default Login;