import React from 'react';
import {View,Text} from 'react-native';
import { WhiteSpace } from 'antd-mobile-rn';
 class Help extends React.Component{
     render(){
        return(
            <View style={{ paddingTop: 120 }}>
                <WhiteSpace size={'lg'}/>
                <Text>This is the help page of this app.</Text>
                <Text>Introduction:</Text>
                <Text>This is an app which offers you a convenient way to manage your gardens and sensors</Text>
                <Text>Usage:</Text>
                <Text>You need to register with your email.</Text>
                <Text>Then explore the App.</Text>
            </View>
        )
    }
 }
 export default Help;