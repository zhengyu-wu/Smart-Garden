import React, { Component,PropTypes } from 'react';

import { Grid, Row } from 'react-bootstrap';

import WrappedLoginPage from '../components/LoginPage/LoginPage'
import WrappedRegisterPage from '../components/RegisterPage/RegisterPage'

import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { auth } from '../actions'

import RouterEntrance from '../components/MenuPage/Menu'
import { Layout,Icon } from 'antd';

const { Header,Content,Footer,Sider } = Layout;

class App extends Component {
    constructor(){
        super();
        this.state={
            userIdLogin:-1,
            userTypeLogin:'USER',
            hasLogin:false
        };
        this.handleLoginSuccess=this.handleLoginSuccess.bind(this);
        this.handleLogout=this.handleLogout.bind(this);
    }
    handleLoginSuccess(id,type){
        console.log("id: "+id+" type: "+type);
        this.setState({
            userIdLogin:id,
            userTypeLogin:type,
            hasLogin:true
        })
    }
    handleLogout(){
        this.setState({
            userIdLogin:-1,
            userTypeLogin:'USER',
            hasLogin:false
        })
    }

    
    handleSubmit = (values) => {

        const { state } = this.props
        const { auth } = this.props

        if(values.login && values.password) auth(values)
        values.login =""
        values.password =""

    }

    render() {

        return(
            <div>
                <RouterEntrance/>
            </div>
        );
        
    }
}

export default connect((state) =>{
        return { state }
    },  { auth }
)(App)

App.propTypes = {
    validateAuth: PropTypes.shape({
        data: PropTypes.Object,
        loading: PropTypes.bool.isRequired,
        result: PropTypes.bool.isRequired,
        validate: PropTypes.bool.isRequired
    })
}
