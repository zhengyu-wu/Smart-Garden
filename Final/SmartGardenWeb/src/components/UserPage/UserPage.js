import React, { Component,PropTypes } from 'react';
//antd
import { Table, Icon, Switch, Radio, Form, Menu, Button, Tabs, Layout, Alert  } from 'antd';
import 'antd/dist/antd.css';
//user页面子页面组件
import WrappedUserGardenPage from './UserGardenPage';
import WrappedUserSensorPage from './UserSensorPage';
import WrappedUserNozzlePage from './UserNozzlePage';
import WrappedUserInfoPage from './UserInfoPage';
import UserLinechartPage from './UserLinechartPage';
import UserHeatmapPage from './UserHeatmapPage';
import UserVideoPage from './UserVideoPage';
//router
import { Link } from 'react-router-dom'



const TabPane = Tabs.TabPane;
const { Header,Content,Footer,Sider } = Layout;
var loginState = localStorage.getItem('userState');

class UserPage extends Component{
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
                    <Tabs type={'line'} style={{ background: '#fff', padding: 0  }}>
                        <TabPane tab={'Manage Gardens'} key={'1'}>{<WrappedUserGardenPage/>}</TabPane>
                        <TabPane tab={'Manage Sensors'} key={'2'}>{<WrappedUserSensorPage/>}</TabPane>
                        <TabPane tab={'Manage Nozzles'} key={'3'}>{<WrappedUserNozzlePage/>}</TabPane>
                        <TabPane tab={'Thermodynamic Chart'} key={'4'}>{<UserHeatmapPage/>}</TabPane>
                        <TabPane tab={'Line Chart'} key={'5'}>{<UserLinechartPage/>}</TabPane>
                        <TabPane tab={'User Information'} key={'6'}>{<WrappedUserInfoPage/>}</TabPane>
                        <TabPane tab={'Check Video'} key={'7'}>{<UserVideoPage/>}</TabPane>
                    </Tabs>
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



export default UserPage;