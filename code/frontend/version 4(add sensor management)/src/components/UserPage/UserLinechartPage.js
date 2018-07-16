import React, { Component,PropTypes } from 'react';
//antd
import { Icon, Menu, Layout } from 'antd';
import 'antd/dist/antd.css';
//折线图插件
import LinechartPage from '../SensorImg/LinechartPage'

const { Header,Content,Footer,Sider } = Layout;

class UserLinechartPage extends Component{

    render() {
        return(
            
            <Layout>
                <Layout>
                <Sider width={200} style={{ background: '#fff'}} height={window.innerHeight}>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} style={{textAlign:'left'}}>
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
                <Content style={{ background: '#fff', padding: 0  }} >
                    {/*此处放折线图*/}
                    <LinechartPage/>
                </Content>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>折线图</Footer>
            </Layout>
        );
    }
}
 
export default UserLinechartPage;