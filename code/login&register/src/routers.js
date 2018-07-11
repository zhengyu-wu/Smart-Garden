import React from 'react';

import {Route} from 'react-router-dom';

import App from './containers/App'
import registerPage from './components/RegisterPage/RegisterPage'
import loginPage from './components/LoginPage/LoginPage'
import userPage from './components/UserPge/UserPge'

export default(
    <div className="container">
        <Route exact path="/" component={App}/>
        <Route path="/register" component={registerPage}/>
        <Route path="/login" component={loginPage}/>
        <Route path="/user" component={userPage}/>
    </div>
)