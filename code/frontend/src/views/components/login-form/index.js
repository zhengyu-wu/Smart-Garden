import React, { Component, PropTypes } from 'react';
import {Layout, Input, Button, Form, Icon, Row, Col, Breadcrumb} from 'antd';
import 'antd/dist/antd.css';
import FormItem from 'antd/lib/form/FormItem';

const { Header,Content,Footer,Sider } = Layout;
const ButtonGroup = Button.Group;

class LoginForm extends Component {
  static propTypes = {
    signInWithLoginAndPassword: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {user : {}};
    this.onSubmit = ::this.onSubmit;
  }

  

  clearInput() {
    this.setState({user : {}});
  }

  handleChange(propertyName, event) {
      const user = this.state.user;
      user[propertyName] = event.target.value;
      this.setState({user: user });
  }
  
  onSubmit(event) {
    event.preventDefault();
    const login = this.state.user.email.trim();
    const password = this.state.user.password.trim();
    if (login.length && password.length) this.props.signInWithLoginAndPassword(login, password);
  }
  

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
              if(response.data!=null){
                  //redux保存用户信息
                  
                  if(response.data.getUserType()==1){
                      //用redux保存登录状态和信息
                      //this.props.handleLoginSuccess(values.userName,'ADMIN');
                  }
                  else{
                      //用redux保存登录状态和信息
                      //this.props.handleLoginSuccess(values.userName,'USER');
                  }
                  message.success('successfully log in');
              }
              else{
                  message.error('user id or password not correct');
              }
          });

      }
    });
  } 

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    return (
      <div id="login">
      <Layout>
        <Header style={{ background: '#000', padding: 0 }}>
          <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              style={{cursor: 'pointer'}}
            />
            </span>
            <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>Login</span>
        </Header>
        <div style={{padding:50}}></div>
        <Content style={{minHeight:900}}>
          <Form className="login-form" onSubmit={this.handleSubmit}>
            <FormItem>
              <Row>
                <Col span="8"></Col>
                <Col span="8">
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    autoFocus
                    maxLength="25"
                    onChange={this.handleChange.bind(this, 'email')}
                    placeholder="Email"
                    type="email"
                    value={this.state.user.email}
                    required
                  />
                </Col>
                <Col span="8"></Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row>
                <Col span="8"></Col>
                <Col span="8">
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  autoComplete="off"
                  maxLength="8"
                  onChange={this.handleChange.bind(this, 'password')}
                  placeholder="Password"
                  type="password"
                  value={this.state.user.password}
                  required
                  />
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
          <center>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item href=" ">Forgot password</Breadcrumb.Item>
            <Breadcrumb.Item href="/sign-up">Sign up now</Breadcrumb.Item>
          </Breadcrumb>
        </center>
        </Content>
        <Footer>
        <center>
          <div className="sign-in__actions clearfix">
            <Icon type="github" />  <Icon type="google" />  <Icon type="twitter" />  <Icon type="facebook" />
          </div>
        </center>
      </Footer>
      </Layout>
      
      </div>
      
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);
export default WrappedLoginForm;
