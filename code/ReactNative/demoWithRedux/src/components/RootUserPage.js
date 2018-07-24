import React from 'react';
import { Text, View ,TextInput,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Login from './Login'
import RootTabBars from './RootTabBar';

class RootUserPage extends React.Component{
    render(){
        if(this.props.user.hasLogin===true)
            return(
            <View style={{flex:1}}>
                <RootTabBars  navigation={this.props.navigation}/>
            </View>);
        else return(
            <View>
                <Login  navigation={this.props.navigation}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(RootUserPage);