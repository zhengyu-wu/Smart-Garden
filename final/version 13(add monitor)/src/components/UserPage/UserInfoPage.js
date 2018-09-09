import React, { Component, PropTypes } from 'react';

import {Layout, Input, Button, Form, Icon, Row, Col, Breadcrumb} from 'antd';
import 'antd/dist/antd.css';
import FormItem from 'antd/lib/form/FormItem';

import axios from "axios/index";

import { Field, reduxForm } from 'redux-form'

const { Header,Content,Footer,Sider } = Layout;

//const LoginUserId = localStorage.getItem('userID');
// var LoginUsername = localStorage.getItem('username');
// var LoginPassword = localStorage.getItem('password');
// var LoginPhone = localStorage.getItem('phone');
// var LoginEmail = localStorage.getItem('email');

class UserInfoPage extends Component{
    constructor(){
        super();
        this.state = {
            userId:-1,//登录的userId
            orginUsername:"",
            orginPassword:"",
            orginPhone:"",
            orginEmail:"",
        }
    }

    //取出该登陆用户的原本信息进行初始化
    componentWillMount(){
        this.setState({
            userId:localStorage.getItem('userID'),
            orginUsername:localStorage.getItem('username'),
            orginPassword:localStorage.getItem('password'),
            orginPhone:localStorage.getItem('phone'),
            orginEmail:localStorage.getItem('email'),
            
        });
        console.log("LoginUsername:",this.state.orginUsername);
        console.log("LoginPassword:",this.state.orginPassword);
        console.log("LoginPhone:",this.state.orginPhone);
        console.log("LoginEmail:",this.state.orginEmail);
    } 

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                
                console.log('Received values of form: ', values);
                console.log("state1:",this.state);
                var params= new URLSearchParams();
                params.append('userId',this.state.userId);
                params.append('username',values.userName);
                params.append('password',values.password);
                params.append('phone',values.phone);
                params.append('email',values.email);
                params.append('userType',0);
                if((values.userName!=null)&&(values.password!=null)&&(values.phone!=null)&&(values.email!=null))
                {
                  axios.post('http://localhost:8080/users/updateUser',params).then((res)=>{
                    //重新更改用户的原本信息
                    this.setState({
                        orginUsername:values.userName,
                        orginPassword:values.password,
                        orginPhone:values.phone,
                        orginEmail:values.email,
                    });
                    console.log("state2:",this.state);
                    //修改登陆用户在localStorage中的信息
                    localStorage.setItem('username', values.userName);
                    localStorage.setItem('password', values.password);
                    localStorage.setItem('phone', values.phone);
                    localStorage.setItem('email', values.email);
                    //更改state中的变量
                    this.setState({
                        orginUsername:localStorage.getItem('username'),
                        orginPassword:localStorage.getItem('password'),
                        orginPhone:localStorage.getItem('phone'),
                        orginEmail:localStorage.getItem('email'),   
                    });
                    
                    
                    console.log(res.data);
                    alert('update user information successfully');
                    
                    //更新redux信息
                  }).catch(err=>{
                    alert("unexpected error in update ");
                  });
                }
                else
                {
                  alert('update failed');
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
            <div id="userInfo">
                <Layout>
                <div style={{padding:80}}></div>
                <Content>
                    <Form className="userInfo-form" onSubmit={this.handleSubmit} style={{ minHeight: window.innerHeight/1.45}}>
                        <FormItem
                        {...formItemLayout} 
                        label="Username"
                        >
                        {getFieldDecorator('userName', {
                                initialValue:this.state.orginUsername,
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
                                initialValue:this.state.orginPhone,
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
                                initialValue:this.state.orginEmail,
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
                                initialValue:this.state.orginPassword,
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
                                initialValue:this.state.orginPassword,
                                rules: [{
                                required: true, message: 'Please confirm your password!',
                                }, {
                                validator: this.compareToFirstPassword,
                                }],
                            })(
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
                                <Input type="submit" value="Modify"/>
                            </Col>
                            <Col span="8"></Col>
                            </Row>
                        </FormItem>
                    </Form>
                </Content>
                </Layout>
            </div>
        );
    }
}

const WrappedUserInfoPage = Form.create()(UserInfoPage);
export default WrappedUserInfoPage;