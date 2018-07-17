import React, { Component,PropTypes } from 'react';
//antd
import { Table, Icon, Switch, Radio, Form, Menu, Button, Tabs, Layout } from 'antd';
import 'antd/dist/antd.css';
//user页面子页面组件
import WrappedUserGardenPage from './UserGardenPage';
import WrappedUserInfoPage from './UserInfoPage';
import UserLinechartPage from './UserLinechartPage'
import UserHeatmapPage from './UserHeatmapPage'



const TabPane = Tabs.TabPane;
const { Header,Content,Footer,Sider } = Layout;

class UserPage extends Component{
    render(){
        return(
            <div>
                <Tabs type={'card'}>
                    <TabPane tab={'Manage Garden'} key={'1'}>{<WrappedUserGardenPage/>}</TabPane>
                    <TabPane tab={'Thermodynamic Chart'} key={'2'}>{<UserHeatmapPage/>}</TabPane>
                    <TabPane tab={'Line Chart'} key={'3'}>{<UserLinechartPage/>}</TabPane>
                    <TabPane tab={'User Information'} key={'4'}>{<WrappedUserInfoPage/>}</TabPane>
                </Tabs>
            </div>
        )
    }
}



export default UserPage;