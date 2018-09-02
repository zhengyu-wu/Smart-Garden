import React from 'react';
import Login from './Login';
import { View,StyleSheet,Text} from 'react-native';
import {connect} from 'react-redux';
import UserPage from "./UserPage";
import {WhiteSpace} from 'antd-mobile-rn'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top:100
    }
});


class Root extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        if(this.props.user.hasLogin===true){
            return(
                <UserPage navigation={this.props.navigation}/>
            );
        }
        else{
            return (
                <View style={styles.container}>
                    <Login navigation={this.props.navigation} />
                    <WhiteSpace size={'lg'}/>
                    <WhiteSpace size={'lg'}/>
                    <WhiteSpace size={'lg'}/>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                    <Text onPress={()=>
                        navigate('Register',{
                            navigation: this.props.navigation
                    })}>Register</Text>
                    <Text>  </Text>
                    <Text onPress={()=>navigate('Help')}>Help </Text>
                    <Text>  </Text>
                    <Text onPress={()=>navigate('ContactUs')}>Contact us </Text>
                    </View>
                </View>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};


export default connect(mapStateToProps)(Root);