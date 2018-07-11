import React, { Component, PropTypes } from 'react';

import {Layout, Input, Button, Form, Icon, Row, Col, Breadcrumb} from 'antd';
import 'antd/dist/antd.css';
import FormItem from 'antd/lib/form/FormItem';

import axios from "axios/index";

import { Field, reduxForm } from 'redux-form'

const { Header,Content,Footer,Sider } = Layout;

class UserInfoPage extends Component{
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
                  axios.post('http://localhost:8080/users/updateUser',params).then((res)=>{
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
                <Content style={{minHeight:900}}>
                    <Form className="userInfo-form" onSubmit={this.handleSubmit}>
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