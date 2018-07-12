import React, { Component,PropTypes } from 'react';
//antd          
import { Icon, Menu,Layout } from 'antd';
import 'antd/dist/antd.css';
//热力图插件
import HeatmapPage from '../SensorImg/HeatmapPage'

const {Content,Footer,Sider } = Layout;

class UserHeatmapPage extends Component{

    render() {
        return(
            
            <Layout>
                <Layout>
                <Sider width={200} style={{ background: '#fff'}} height={window.innerHeight}>
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
                <Content style={{ background: '#fff', padding: 0  }}>
                    {/*此处放热力图*/}
                    <HeatmapPage/>
                </Content>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>热力图</Footer>
            </Layout>
        );
    }
}

export default UserHeatmapPage;