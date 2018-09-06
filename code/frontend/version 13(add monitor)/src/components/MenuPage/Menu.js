import React ,{ Component } from 'react'
//router
import { BrowserRouter as Router,Route, withRouter } from 'react-router-dom'
import  {Link,Switch} from 'react-router-dom'
import createHashHistory from 'history/createBrowserHistory'
//页面组件
import WrappedLoginPage from '../LoginPage/LoginPage'
import WrappedRegisterPage from '../RegisterPage/RegisterPage'
import WrappedAdminUserPage from '../AdminPage/AdminPage'
import WrappedActivationPage from '../ActivationPage/ActivationPage'
import UserPage from '../UserPage/UserPage'
import HeaderPage from '../HeaderPage/HeaderPage'
//antd
import { Layout, Menu, Icon, Button } from 'antd';
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
            
            <Router history={hashHistory}>
                
                <div>
                    <Layout>
                        <HeaderPage/>

                    <Content>
                        <Switch>
                        <Route path='/login' render={()=><WrappedLoginPage/>}/>
                        <Route path='/register' render={()=><WrappedRegisterPage/>}/>
                        <Route path='/admin' render={()=><WrappedAdminUserPage/>}/>
                        <Route path='/user' render={()=><UserPage/>}/>
                        <Route path='/activation' render={()=><WrappedActivationPage/>}/>
                        <WrappedLoginPage/>
                        </Switch>
                        
                    </Content>
                    </Layout>
                </div>
            </Router>
            
        );
    }
}


export default withRouter(RouterEntrance);