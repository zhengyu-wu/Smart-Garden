import React from 'react';
import {View,Text} from 'react-native';
import { WhiteSpace } from 'antd-mobile-rn';

class Help extends React.Component{

    render(){
        return(
            <View>
                <WhiteSpace size={'lg'}/>
                <Text>This is the help page of this app</Text>
                <Text>Introduction</Text>
                <Text>This is an app which offers you a convenient way to manage your gardens and sensors</Text>
                <Text>Usage</Text>
                <Text>You need an account to use this app, you can register one with your email, then login with this email and your password</Text>
                <Text>You can add/delete gardens and sensors in this app</Text>
            </View>
        )
    }
}
export default Help;