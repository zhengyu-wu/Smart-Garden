import React,{Component} from 'react';
import {
    View,
    Text,
} from 'react-native';

import {StackNavigator} from 'react-navigation';
//接下来应该从pages中引入各个page
import LoginPage from './app/pages/LoginPage'
import MainPage from './app/pages/MainPage'
import configureStore from "./app/store/ConfigureStore";
import {Provider} from "react-redux";


const store = configureStore();

const AppMain=StackNavigator({
   Login: {screen:LoginPage},
    Main: {screen:MainPage},
});

class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <AppMain/>
            </Provider>
        )
    }
}

export default App;

