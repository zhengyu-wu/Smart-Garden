import React, { Component, PropTypes } from 'react';

import {Layout, Input, Button, Form, Icon, Row, Col, Breadcrumb} from 'antd';
import 'antd/dist/antd.css';
import FormItem from 'antd/lib/form/FormItem';

import axios from "axios/index";

import { Field, reduxForm } from 'redux-form'

import { Link, withRouter } from 'react-router-dom'

const { Header,Content,Footer,Sider } = Layout;

class ActivationPage extends Component{
    constructor(){
        super();
        this.state = {
            activationUserId:-1,
        }
    }

    componentWillMount(){
        this.setState({
            activationUserId:localStorage.getItem('activationUserId'),
        })
    } 

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                
                console.log('Received values of code: ', values);
                console.log('activationCode: ', localStorage.getItem('activationCode'));
                if(values.activationCode==localStorage.getItem('activationCode'))
                {
                    var params= new URLSearchParams();
                    params.append('userId',localStorage.getItem('activationUserId'));
                    if(localStorage.getItem('activationUserId')!=-1)
                    {
                        axios.post('http://localhost:8080/users/activeUserWithUserId',params).then((res)=>{
                            alert('successfully activate your account!');
                            this.props.history.push('/login');
                        })
                    }
                    else
                    {
                        alert("unexpected error in activation!");
                    }
                }
                else
                {
                    alert("error activation code!");
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
        <div id="activation">
            <Layout>
            <div style={{padding:80}}></div>
            <Content>
                <center><h1>Activation</h1></center>
                <Form className="activation-form" onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout} 
                    label="ActivationCode"
                >
                    {getFieldDecorator('activationCode', {
                            rules: [{ required: true, message: 'Please input your activationCode!', whitespace: true }],
                        })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="ActivationCode"
                        type="activationCode"
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

const WrappedActivationPage = Form.create()(ActivationPage);
export default withRouter(WrappedActivationPage);