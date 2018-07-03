import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux'; // 引入connect函数
import { NavigationActions,StackActions} from 'react-navigation';


//清空路由并跳转到Login界面 用于登出操作
const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Login'})
    ]
})

class MainPage extends Component {

    static navigationOptions = {
        title: 'MainPage',
    };

    logout() {
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        const { user } = this.props.navigation;
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this.logout.bind(this)} style={{marginTop: 50}}>
                    <View>
                        <Text>退出登录
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FFFF'
    }
});

export default MainPage;

