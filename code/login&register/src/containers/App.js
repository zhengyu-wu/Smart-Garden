import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router,Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import WrappedLoginPage from '../components/LoginPage/LoginPage'
import WrappedRegisterPage from '../components/RegisterPage/RegisterPage'
import createHashHistory from 'history/createBrowserHistory'
import { Grid, Row } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form'
import { auth } from '../actions'

import RouterEntrance from '../components/MenuPage/Menu'
import { Layout,Icon } from 'antd';

const { Header,Content,Footer,Sider } = Layout;

class App extends Component {

    
    handleSubmit = (values) => {

        const { state } = this.props
        const { auth } = this.props

        if(values.login && values.password) auth(values)
        values.login =""
        values.password =""

    }

    render() {
        var hashHistory = createHashHistory();
        const { validateAuth } = this.props.state

        return (
            <div>
                <Header style={{ background: '#000', padding: 0 }}>
                <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>
                    <Icon
                    className="trigger"
                    style={{cursor: 'pointer'}}
                    />
                    </span>
                    <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>Smart Garden</span>
                </Header>
                <Layout>
                    <RouterEntrance/>
                    {/*
                    <Sider>
                        
                    </Sider>
                    <Content>
                        <WrappedLoginPage val = {validateAuth} onSubmit={this.handleSubmit} />
                    </Content>
                    */}
                </Layout>
            
            
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
