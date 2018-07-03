

//provider对视图部分的包裹
import React,{ Componet } from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/ConfigureStore';

import App from '../App';

const store = configureStore();

export default class Root extends Componet{
    render(){
        return(
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}