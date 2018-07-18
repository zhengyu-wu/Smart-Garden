import React, { Component,PropTypes } from 'react';
//antd
import {Layout, Input, Button, Form, Icon, Row, Col, Breadcrumb} from 'antd';
import 'antd/dist/antd.css';
import FormItem from 'antd/lib/form/FormItem';
//redux
import { Field, reduxForm } from 'redux-form'
//axios
import axios from "axios/index";
//router
import { Link, Route, withRouter } from 'react-router-dom'
import {save_user} from '../../actions'
import { connect } from 'react-redux';



const { Header,Content,Footer,Sider } = Layout;
const ButtonGroup = Button.Group;

class LoginPage extends Component {

    constructor(){
        super();
        this.state = {
            userId: -1,
            email: "",
            phone: '',
            hasLogin:false,
        }
    }

    handleSubmit = (e) => {
        const {save_user} = this.props;
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
                    // console.log('login information:',values.email,values.password);
                    // console.log('response:',response.data);
                    if(typeof(response.data.userId)!='undefined'){
                        //redux保存用户信息
                        // console.log('login userId:',response.data.userId);
                        // console.log('email:', response.data.email);
                        // console.log('data:', response.data)
                        this.setState({userId: response.data.userId,
                                        email: response.data.email,
                                        phone: response.data.phone
                                    });
                        save_user(response.data.userId,response.data.email,response.data.phone);
                        //将登录的user信息存入localStorage
                        localStorage.setItem('userID', this.state.userId);
                        localStorage.setItem('username', response.data.username);
                        localStorage.setItem('password', response.data.password);
                        localStorage.setItem('phone', response.data.phone);
                        localStorage.setItem('email', response.data.email);
                        localStorage.setItem('userState', response.data.userState);
                        localStorage.setItem('userType', response.data.userType);
                        
                        const a = localStorage.getItem('userID');
                        // console.log('a:', a);
                        // console.log('state:', this.state);

                        
                        if(response.data.userType==1){
                            //用redux保存登录状态和信息
                            this.props.history.push('/admin');
                            //this.props.handleLoginSuccess(values.userName,'ADMIN');
                        }
                        else{
                            //用redux保存登录状态和信息
                            this.props.history.push('/user');
                            //this.props.handleLoginSuccess(values.userName,'USER');
                        }
                        
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
            <div style={{padding:80}}></div>
            <Content style={{minHeight:window.innerHeight}}>
            <center>
            <h1>Login</h1>
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

const mapStatetoProps = (state) => {
    return {
        user: state.user
    };
};

const WrappedLoginPage = Form.create()(LoginPage);
export default withRouter(connect(mapStatetoProps, {save_user})(WrappedLoginPage));