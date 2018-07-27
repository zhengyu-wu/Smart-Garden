import React, { Component,PropTypes } from 'react';
//antd
import { Modal, Table, Icon, Switch, Radio, Form, Divider, Input, Layout, Row, Col, Popconfirm } from 'antd';
import 'antd/dist/antd.css';
import FormItem from 'antd/lib/form/FormItem';
const { Header,Content,Footer,Sider } = Layout;
//axios
import axios from "axios/index";

import WrappedAdminUserPage from './AdminUserPage';

//const FormItem = Form.Item;


  


class AdminPage extends Component{
  constructor(){
    super();
    this.state = {
        loginState:0,
    }
  } 

  componentWillMount(){
    this.setState({
        loginState:localStorage.getItem('userState'),
    })
  } 

  render(){
    if(this.state.loginState){
        return(
            <div>
                <WrappedAdminUserPage/>
            </div>
        )
    }
    else{
        return(
            <div>
                <Layout>
                        <Alert
                        message="Warning"
                        description="You have to login first."
                        type="warning"
                        showIcon
                        />
                        <span style={{fontSize:'1.8em',paddingTop:'10%'}}><center><Link to="/login">Go to login</Link></center></span>
                </Layout>
            </div>
        );
        
    }
  }
}

export default AdminPage;