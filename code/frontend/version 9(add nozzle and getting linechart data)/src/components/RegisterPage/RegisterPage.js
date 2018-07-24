import React, { Component, PropTypes } from 'react';

import {Layout, Input, Button, Form, Icon, Row, Col, Breadcrumb} from 'antd';
import 'antd/dist/antd.css';
import FormItem from 'antd/lib/form/FormItem';

import axios from "axios/index";

import { Field, reduxForm } from 'redux-form'

import { Link, withRouter } from 'react-router-dom'

const { Header,Content,Footer,Sider } = Layout;

class RegisterPage extends Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                
                console.log('Received values of form: ', values);
    
                var params= new URLSearchParams();
                params.append('username',values.userName);
                params.append('password',values.password);
                params.append('phone',values.phone);
                params.append('email',values.email);
                params.append('userType',0);
                if((values.userName!=null)&&(values.password!=null)&&(values.phone!=null)&&(values.email!=null))
                {
                  axios.post('http://localhost:8080/users/addUser',params).then((res)=>{
                    console.log("New User:",res.data);
                    //从后端接口返回user中取出新user的userId
                    localStorage.setItem("activationUserId", res.data.userId);
                    console.log("activationUserId:", res.data.userId);
                    //发送邮件
                    axios.get(`http://localhost:8080/email/sendEmail`,{params:{'recv':values.email}})
                    .then(res => {
                        //将激活码存入localstorage
                        console.log("activationCode:", res.data);
                        localStorage.setItem("activationCode", res.data);
                        
                        alert('register successfully,please activate your account!');
                    });

                    this.props.history.push('/activation');
                    //更新redux信息
                  }).catch(err=>{
                    alert("unexpected error in register ");
                  });

                  

                }
                else
                {
                  alert('register failed');
                }
    
                
            }
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };

        return(
        <div id="login">
            <Layout>
            <div style={{padding:80}}></div>
            <Content>
                <center><h1>Register</h1></center>
                <Form className="login-form" onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout} 
                    label="Username"
                >
                    {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
                        })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        type="username"
                        required
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout} 
                    label="Phone"
                >
                    {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(
                        <Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Phone"
                        type="phone"
                        required
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout} 
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                        type="email"
                        required
                        />
                        )}
                    
                </FormItem>
                <FormItem
                    {...formItemLayout} 
                    label="Password"
                >
                    {getFieldDecorator('password', {
                    rules: [{
                    required: true, message: 'Please input your password!',
                    }, {
                    validator: this.validateToNextPassword,
                    }],
                    })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Password"
                    type="password"
                    required
                    />
                    )}
                    
                </FormItem>
                <FormItem 
                    {...formItemLayout} 
                    label="Confirm Password"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })
                    (
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} onBlur={this.handleConfirmBlur}
                        placeholder="Confirm your Password"
                        type="password"
                        required
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Row>
                    <Col span="8"></Col>
                    <Col span="8">
                        <Input type="submit" value="Sign Up"/>
                    </Col>
                    <Col span="8"></Col>
                    </Row>
                </FormItem>
                </Form>
                <center>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Link to="/login">Login</Link>
                </Breadcrumb>
                </center>
            </Content>
            </Layout>
        </div>
        );
    }
}

const WrappedRegisterPage = Form.create()(RegisterPage);
export default withRouter(WrappedRegisterPage);