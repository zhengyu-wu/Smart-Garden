import React from 'react';

import {Route} from 'react-router-dom';

import App from './containers/App'
import WrappedRegisterPage from './components/RegisterPage/RegisterPage'
import WrappedLoginPage from './components/LoginPage/LoginPage'
import WrappedAdminUserPage from './components/AdminPage/AdminPage'
import UserPage from './components/UserPage/UserPage'
import RouterEntrance from './components/MenuPage/Menu'

export default(
    <div className="container">
        <Route exact path="/" component={App}/>
        <Route path="/register" component={WrappedRegisterPage}/>
        <Route path="/login" component={WrappedLoginPage}/>
        <Route path="/admin" component={WrappedAdminUserPage}/>
        <Route path="/user" component={UserPage}/>
        <Route path="/" component={RouterEntrance}/>
    </div>
)