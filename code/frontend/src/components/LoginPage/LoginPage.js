import React, { Component,PropTypes } from 'react';

import {Layout, Input, Button, Form, Icon, Row, Col, Breadcrumb} from 'antd';
import 'antd/dist/antd.css';
import FormItem from 'antd/lib/form/FormItem';

import { Field, reduxForm } from 'redux-form'

import axios from "axios/index";

import { Link } from 'react-router-dom'

const { Header,Content,Footer,Sider } = Layout;
const ButtonGroup = Button.Group;

class LoginPage extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.get(`http://localhost:8080/users/loginWithEmail`,{
                    params:{
                        email:values.email,
                        password:values.password
                    }
                }).then((response) => {
                    console.log(values.email,values.password);
                    if(typeof(response.data.userId)!='undefined'){
                        console.log(response.data.userId);
                        //redux保存用户信息
                        
                        /*
                        if(response.data.getUserType()==1){
                            //用redux保存登录状态和信息
                            //this.props.handleLoginSuccess(values.userName,'ADMIN');
                        }
                        else{
                            //用redux保存登录状态和信息
                            //this.props.handleLoginSuccess(values.userName,'USER');
                        }
                        */
                        alert('successfully log in');
                    }
                    else{
                        alert('log in failed');
                    }
                });
      
            }
          });
        } 



    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
        <div id="login">
        <Layout>
            {/*
            <Header style={{ background: '#000', padding: 0 }}>
            <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>
                <Icon
                className="trigger"
                style={{cursor: 'pointer'}}
                />
                </span>
                <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>Login</span>
            </Header>
            */}
            <div style={{padding:80}}></div>
            <Content style={{minHeight:900}}>
            <center>
            <Form className="login-form" onSubmit={this.handleSubmit}>
                <FormItem>
                <Row>
                    <Col span="8"></Col>
                    <Col span="8">
                    {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                        type="email"
                        />
                    )}
                    </Col>
                    <Col span="8"></Col>
                </Row>
                </FormItem>
                <FormItem>
                <Row>
                    <Col span="8"></Col>
                    <Col span="8">
                    {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Password"
                        type="password"
                        />
                    )}
                    </Col>
                    <Col span="8"></Col>
                </Row>
                </FormItem>
                <FormItem>
                <center>
                    <ButtonGroup >
                    <Button type="primary" htmlType="submit" className="Log in" value="Log in">
                    Log in
                    </Button>  
                    <Button type="primary" onClick={this.handleReset}>
                    Cancel
                    </Button>
                    </ButtonGroup>
                </center>
                </FormItem>
            </Form>
            </center>
            <center>
            <Breadcrumb style={{ margin: '12px 0' }}>
                <Breadcrumb.Item href=" ">Forgot password</Breadcrumb.Item>
                <Link to="/register">Register</Link>
            </Breadcrumb>
            </center>
            </Content>
        </Layout>
        
        </div>
        
        );
    }
}

const WrappedLoginPage = Form.create()(LoginPage);
export default WrappedLoginPage

