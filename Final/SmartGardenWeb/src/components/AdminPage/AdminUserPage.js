import React, { Component,PropTypes } from 'react';
//antd
import { Modal, Table, Icon, Switch, Radio, Form, Divider, Input, Layout, Row, Col, Popconfirm } from 'antd';
import 'antd/dist/antd.css';
import FormItem from 'antd/lib/form/FormItem';
const { Header,Content,Footer,Sider } = Layout;
//axios
import axios from "axios/index";

//const FormItem = Form.Item;


  
  const expandedRowRender = record => <p>{record.description}</p>;
  const showHeader = true;
  const footer = () => 'User Table';
  const scroll = { y: 240 };
  const pagination = { position: 'bottom' };


class AdminUserPage extends Component{
  constructor(){
    super();
    this.state = {
      users: [],
      bordered: true,
      loading: false,
      pagination,
      size: 'default',
      expandedRowRender,
      title: undefined,
      showHeader,
      footer,
      rowSelection: {},
      scroll: undefined,
      modalVisible: false,
      chosenUser:-1,//被选中的userId
    }
  }

  //state中users从后端数据库取数据初始化
  componentWillMount(){
    axios.get(`http://localhost:8080/users/getAllUser`)
        .then(res => {
            //console.log(bookAll);
            //console.log(bookAll.length);
            //if(bookAll.length===0) bookAll = res.data;
            this.setState({
                users: res.data,
            });
            console.log("res.data:",res.data);
            console.log("users:",this.state.users);
        })
  } 

  componentDidMount(){
    axios.get(`http://localhost:8080/users/getAllUser`)
        .then(res => {
            //console.log(bookAll);
            //console.log(bookAll.length);
            //if(bookAll.length===0) bookAll = res.data;
            this.setState({
                users: res.data,
            });
        })
}

  //修改信息对话框控制函数
  showModal = (userId) => {
    this.setState({
      chosenUser:userId,
      modalVisible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  }

  //用户信息修改提交
  updateUserSubmit = (userId) => {
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            
            console.log('Received values of form: ', values);

            var params= new URLSearchParams();
            params.append('userId',userId);
            params.append('username',values.userName);
            params.append('password',values.password);
            params.append('phone',values.phone);
            params.append('email',values.email);
            params.append('userType',values.userType);
            params.append('userState',values.userState);
            if((values.userName!=null)&&(values.password!=null)&&(values.phone!=null)&&(values.email!=null))
            {
              axios.post('http://localhost:8080/users/updateUser',params).then((res)=>{
                console.log(res.data);
                axios.get(`http://localhost:8080/users/getAllUser`)
                .then(res => {
                    this.setState({
                        users: res.data,
                    });
                })
                alert('update successfully');
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
   
  //用户信息删除提交
  deleteUserSubmit = (userId) => {
    console.log('delete function');
    //e.preventDefault();

    var params= new URLSearchParams();
    params.append('userId',userId);

    axios.post('http://localhost:8080/users/deleteByUserId',params).then((res)=>{
      console.log(res.data);
      axios.get(`http://localhost:8080/users/getAllUser`)
      .then(res => {
        this.setState({
          users: res.data,
        });
      })
      alert('delete successfully');
      //更新redux信息
    });
  }

  //按钮渲染相关函数
  handleToggle = (prop) => {
    return (enable) => {
      this.setState({ [prop]: enable });
    };
  }

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  handleExpandChange = (enable) => {
    this.setState({ expandedRowRender: enable ? expandedRowRender : undefined });
  }

  handleHeaderChange = (enable) => {
    this.setState({ showHeader: enable ? showHeader : false });
  }

  handleFooterChange = (enable) => {
    this.setState({ footer: enable ? footer : undefined });
  }

  handleRowSelectionChange = (enable) => {
    this.setState({ rowSelection: enable ? {} : undefined });
  }

  handleScollChange = (enable) => {
    this.setState({ scroll: enable ? scroll : undefined });
  }

  handlePaginationChange = (e) => {
    const { value } = e.target;
    this.setState({
      pagination: value === 'none' ? false : { position: value },
    });
  }

  render() {
    //form样式
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
    const state = this.state;
    //列表样式
    const columns = [{
      title: 'UserId',
      dataIndex: 'userId',
      key: 'userId',
      width: 100,
    },{
      title: 'UserName',
      dataIndex: 'username',
      key: 'username',
      width: 150,
    },{
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },{
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      width: 200,
    },{
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
    },{
      title: 'UserType',
      dataIndex: 'userType',
      key: 'userType',
      width: 120,
    },{
      title: 'UserState',
      dataIndex: 'userState',
      key: 'userState',
    },{
      title: 'Action',
      key: 'action',
      width: 300,
      render: (text, record) => (
        <span>
          {/*通过对话窗表单提交修改数据*/}
          <a onClick={()=>this.showModal(record.userId)} href="javascript:;">Modify</a>
          <Modal title="Update User" visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
              <Form className="login-form" onSubmit={()=>this.updateUserSubmit(this.state.chosenUser)}>
                <FormItem
                    {...formItemLayout} 
                    label="Username"
                >
                    {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input username!', whitespace: true }],
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
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input E-mail!',
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
                    required: true, message: 'Please input password!',
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
                    label="Phone"
                >
                    {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input phone number!' }],
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
                    label="UserType"
                >
                    {getFieldDecorator('userType', {
                            rules: [{ required: true, message: 'Please input userType!' }],
                        })(
                        <Input prefix={<Icon type="info-circle-o" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="UserType"
                        type="userType"
                        required
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout} 
                    label="UserState"
                >
                    {getFieldDecorator('userState', {
                            rules: [{ required: true, message: 'Please input userState!' }],
                        })(
                        <Input prefix={<Icon type="info-circle-o" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="UserState"
                        type="userState"
                        required
                        />
                    )}
                </FormItem>
                
                <FormItem>
                    <Row>
                    <Col span="8"></Col>
                    <Col span="8">
                        <Input type="submit" value="Update"/>
                    </Col>
                    <Col span="8"></Col>
                    </Row>
                </FormItem>
              </Form>
          </Modal>
          <Divider type="vertical" />
          <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteUserSubmit(record.userId)}>
            <a href="javascript:;">Delete</a>
          </Popconfirm>
          <Divider type="vertical" />
          {/* <a href="javascript:;" className="ant-dropdown-link">
            More actions <Icon type="down" />
          </a> */}
        </span>
      ),
    }];

    return (
        <div>
          <div className="components-table-demo-control-bar">
            <Form layout="inline" height={window.innerHeight}>
              <FormItem label="Bordered">
                <Switch checked={state.bordered} onChange={this.handleToggle('bordered')} />
              </FormItem>
              <FormItem label="loading">
                <Switch checked={state.loading} onChange={this.handleToggle('loading')} />
              </FormItem>
              <FormItem label="Column Header">
                <Switch checked={!!state.showHeader} onChange={this.handleHeaderChange} />
              </FormItem>
              <FormItem label="Footer">
                <Switch checked={!!state.footer} onChange={this.handleFooterChange} />
              </FormItem>
              <FormItem label="Expandable">
                <Switch checked={!!state.expandedRowRender} onChange={this.handleExpandChange} />
              </FormItem>
              <FormItem label="Checkbox">
                <Switch checked={!!state.rowSelection} onChange={this.handleRowSelectionChange} />
              </FormItem>
              <FormItem label="Fixed Header">
                <Switch checked={!!state.scroll} onChange={this.handleScollChange} />
              </FormItem>
              <FormItem label="Size">
                <Radio.Group size="default" value={state.size} onChange={this.handleSizeChange}>
                  <Radio.Button value="default">Default</Radio.Button>
                  <Radio.Button value="middle">Middle</Radio.Button>
                  <Radio.Button value="small">Small</Radio.Button>
                </Radio.Group>
              </FormItem>
              <FormItem label="Pagination">
                <Radio.Group
                  value={state.pagination ? state.pagination.position : 'none'}
                  onChange={this.handlePaginationChange}
                >
                  <Radio.Button value="top">Top</Radio.Button>
                  <Radio.Button value="bottom">Bottom</Radio.Button>
                  <Radio.Button value="both">Both</Radio.Button>
                  <Radio.Button value="none">None</Radio.Button>
                </Radio.Group>
              </FormItem>
            </Form>
          </div>
          <Table {...this.state} columns={columns} dataSource={this.state.users} />
        </div>
      );
  }
}

const WrappedAdminUserPage = Form.create()(AdminUserPage);
export default WrappedAdminUserPage