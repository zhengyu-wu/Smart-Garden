import React, { Component, PropTypes } from 'react';
import {Layout, Input, Button, Form, Icon, Row, Col, Breadcrumb} from 'antd';
import 'antd/dist/antd.css';
import FormItem from 'antd/lib/form/FormItem';

const { Header,Content,Footer,Sider } = Layout;

class SignUpForm extends Component {
  static propTypes = {
    signUp: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {newUser : {}};
    this.onSubmit = ::this.onSubmit;
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
}

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
    } else {
        callback();
    }
}

  clearInput() {
    this.setState({user : {}});
  }

  handleChange(propertyName, event) {
      const newUser = this.state.newUser;
      newUser[propertyName] = event.target.value;
      this.setState({newUser: newUser });
  }

  onSubmit(event) {
    event.preventDefault();
    const login = this.state.newUser.email.trim();
    const password = this.state.newUser.password.trim();
    const passwordConfirmation = this.state.newUser.passwordConfirmation.trim();
    if (password.length && password === passwordConfirmation) 
      this.props.signUp(login, password);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            
            console.log('Received values of form: ', values);

            var params= new URLSearchParams();
            params.append('userName',values.userName);
            params.append('password',values.password);
            params.append('phone',values.phone);
            params.append('email',values.email);

            axios.post('http://localhost:8080/user/addUser',params).then((res)=>{
                console.log(res.data);
                alert('register successfully, your id is'+res.data+' . Please remember your id.');
                this.props.handleLoginSuccess(res.data,'USER');
            }).catch(err=>{
                alert("unexpected error in register ");
            });
        }
      });
    }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    

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
              <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>Register</span>
          </Header>
          <div style={{padding:50}}></div>
          <Content style={{minHeight:900}}>
            <Form className="login-form" onSubmit={this.onSubmit}>
              <FormItem
                {...formItemLayout} 
                label="Username"
              >
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                autoFocus
                maxLength="25"
                onChange={this.handleChange.bind(this, 'username')}
                placeholder="Username"
                type="username"
                value={this.state.newUser.username}
                required
                />
              </FormItem>
              <FormItem
                {...formItemLayout} 
                label="Phone"
              >
                <Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                autoFocus
                maxLength="25"
                onChange={this.handleChange.bind(this, 'phone')}
                placeholder="Phone"
                type="phone"
                value={this.state.newUser.phone}
                required
                />
              </FormItem>
              <FormItem
                {...formItemLayout} 
                label="E-mail"
              >
                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                autoFocus
                maxLength="25"
                onChange={this.handleChange.bind(this, 'email')}
                placeholder="Email"
                type="email"
                value={this.state.newUser.email}
                required
                />
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
                  autoComplete="off"
                  maxLength="8"
                  onChange={this.handleChange.bind(this, 'password')}
                  placeholder="Password"
                  type="password"
                  value={this.state.newUser.password}
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
                    autoComplete="off"
                    maxLength="8"
                    onChange={this.handleChange.bind(this, 'passwordConfirmation')}
                    placeholder="Confirm your Password"
                    type="password"
                    value={this.state.newUser.passwordConfirmation}
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
                <Breadcrumb.Item href="/sign-in">Login</Breadcrumb.Item>
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

const WrappedSignUp = Form.create()(SignUpForm);
export default WrappedSignUp;
