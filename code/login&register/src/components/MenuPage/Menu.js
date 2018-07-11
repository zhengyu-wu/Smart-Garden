import React ,{ Component } from 'react'

import { BrowserRouter as Router,Route } from 'react-router-dom'
import  {Link,Switch} from 'react-router-dom'
import createHashHistory from 'history/createBrowserHistory'

import WrappedLoginPage from '../LoginPage/LoginPage'
import WrappedRegisterPage from '../RegisterPage/RegisterPage'
import WrappedUserInfoPage from '../UserInfoPage/UserInfoPage'
import { Layout, Menu,Icon } from 'antd';

const { Header,Content,Footer,Sider } = Layout;

class RouterEntrance extends Component{
    state={
        //menu收缩管理变量
        collapsed: false,
        mode:'inline',
        //对话框管理变量
        loading: false,
        visible: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render(){
        

        var hashHistory = createHashHistory();

        return(
            {/*
            <Router history={hashHistory}>
                <div>
                <li><Link to={'/login'}>LoginPage</Link></li>
                <li><Link to={'/register'}>RegisterPage</Link></li>
                <Switch>
                    <Route path='/login' render={()=><WrappedLoginPage/>}/>
                    <Route path='/register' render={()=><WrappedRegisterPage/>}/>
                </Switch>
                </div>
            </Router>
            */},
            
            <Router history={hashHistory}>
                <div>
                    <Layout>
                    <Sider>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Icon type="user" />
                        <span className="nav-text"><Link to={'/login'}>LoginPage</Link></span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="user" />
                        <span className="nav-text"><Link to={'/register'}>RegisterPage</Link></span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="user" />
                        <span className="nav-text"><Link to={'/userInfo'}>UserInfoPage</Link></span>
                    </Menu.Item>
                    </Menu>
                    </Sider>
                    <Content>
                        
                        <Switch>
                        <Route path='/login' render={()=><WrappedLoginPage/>}/>
                        <Route path='/register' render={()=><WrappedRegisterPage/>}/>
                        <Route path='/userInfo' render={()=><WrappedUserInfoPage/>}/>
                        <WrappedLoginPage/>
                        </Switch>
                        
                    </Content>
                    </Layout>
                </div>
            </Router>
            
        );
    }
}


export default RouterEntrance;