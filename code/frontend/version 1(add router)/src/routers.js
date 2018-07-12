import React from 'react';

import {Route} from 'react-router-dom';

import App from './containers/App'
import WrappedRegisterPage from './components/RegisterPage/RegisterPage'

export default(
    <div className="container">
        <Route exact path="/" component={App}/>
        <Route path="/#/register" component={WrappedRegisterPage}/>
    </div>
)