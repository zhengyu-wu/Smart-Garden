import React, { Component,PropTypes } from 'react';

import { Table, Icon, Switch, Radio, Form, Menu, Button, Tabs, Layout } from 'antd';
import 'antd/dist/antd.css';

import WrappedUserInfoPage from './UserInfoPage'

const TabPane = Tabs.TabPane;
const { Header,Content,Footer,Sider } = Layout;

class UserChartPage extends Component{

    render() {
        return(
            <Layout>
                <Content style={{ background: '#fff', padding: 0  }}>
                <Sider width={200} style={{ background: '#fff' , minHeight:900}}>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} style={{textAlign:'left', minHeight: 500}}>
                        <Menu.Item key="1">
                            <Icon type="shop" />
                            <span className="nav-text">garden 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="shop" />
                            <span className="nav-text">garden 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="shop" />
                            <span className="nav-text">garden 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                
                        {/*此处放热力图*/}
                
                <Footer style={{ textAlign: 'center' }}>热力图</Footer>
                </Content>
            </Layout>
        );
    }
}

class UserPage extends Component{
    render(){
        return(
            <div>
                <Tabs type={'card'}>
                    <TabPane tab={'Thermodynamic Chart'} key={'1'}>{<UserChartPage/>}</TabPane>
                    <TabPane tab={'User Information'} key={'2'}>{<WrappedUserInfoPage/>}</TabPane>
                </Tabs>
            </div>
        )
    }
}



export default UserPage;