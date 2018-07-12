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
const loginState = localStorage.getItem('userState');

class UserPage extends Component{
    render(){
        if(loginState){
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
        else{
            /*
            hahahaa 是你的了 哈哈哈哈
            */
        }
    }
}



export default UserPage;