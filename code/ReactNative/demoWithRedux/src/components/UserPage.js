import React from 'react';
import { Text, View ,TextInput,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {log_out} from "../actions";
import Login from './Login'
import {Button,List,InputItem} from 'antd-mobile-rn';
import TabBars from './TabBar';

class UserPage extends React.Component{
    render(){
        const {log_out}=this.props;
        if(this.props.user.hasLogin===true)
            return(
            <View>
                <ScrollView>
                    <Button type={'primary'} onClick={()=>log_out()}>
                        Logout
                    </Button>
                </ScrollView>
                <View style={{height:45}}>
                    <TabBars/>
                </View>
            </View>);
        else return(
            <View>
                <Login/>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps,{log_out})(UserPage);