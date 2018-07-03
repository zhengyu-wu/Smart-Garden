import { Layout, Menu, Breadcrumb, Icon, Input, Row, Col, Button, Collapse, Switch } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import 'antd/dist/antd.css';
import './Antitest.css'

import React, { Component } from 'react';

import logo from '../logo.svg';
import sensorLocation from '../sensorLocation.png'

const { Header,Content,Footer,Sider } = Layout;
const ButtonGroup = Button.Group;
const Panel = Collapse.Panel;

function callback(key) {
    console.log(key);
}

class SiderDemo extends Component {
    //state状态
    state={
        collapsed: false,
        mode:'inline',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    
    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span className="nav-text">nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span className="nav-text">nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span className="nav-text">nav 3</span>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span className="nav-text">sub 1</span></span>}>
                        <Menu.Item key="4">
                            <Icon type="user" />
                            <span className="nav-text">nav 4</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="video-camera" />
                            <span className="nav-text">nav 5</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="upload" />
                            <span className="nav-text">nav 6</span>
                        </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#000', padding: 0 }}>
                        <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                                style={{cursor: 'pointer'}}
                            />
                        </span>
                        <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>Anti Demo</span>
                        <span style={{color:'#fff', float:'right', paddingRight:'1%'}}>
                            <img src={logo} className="App-logo" alt="logo" />
                        </span>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>

                        {/* Login部分 */}
                        <Collapse defaultActiveKey={['1']} onChange={callback}>
                            <Panel header="Login Demo" key="1">
                                <div style={{ padding: 24, background: '#fff', minHeight: 200 }}>
                                    <h1 style={{textAlign:'center'}}> Login </h1>
                                    <div className="Login">
                                        <Row>
                                            <Col span="8"></Col>
                                            <Col span="8">
                                                <center><div className="defaultInput"><Input addonBefore={<Icon type="user" />} placeholder="Plz input username" /></div></center>
                                            </Col>
                                            <Col span="8"></Col>
                                        </Row>
                                        <Row>
                                            <Col span="8"></Col>
                                            <Col span="8">
                                                <center><div className="defaultInput"><Input addonBefore={<Icon type="lock" />} placeholder="Plz input password" /></div></center>
                                            </Col>
                                            <Col span="8"></Col>
                                        </Row>
                                        <Row>
                                            <Col span="8"></Col>
                                            <Col span="8">
                                            <center>
                                            <ButtonGroup >
                                                <Button type="primary">Login</Button>
                                                <Button type="primary">Cancel</Button>
                                            </ButtonGroup>
                                            </center>
                                            </Col>
                                            <Col span="8"></Col>
                                        </Row>
                                    </div>
                                </div>
                            </Panel>
                        </Collapse>

                        <br/>

                        {/* Sensor部分 */}
                        <Collapse defaultActiveKey={['2']} onChange={callback}>
                            <Panel header="Sensor Demo" key="1">
                                
                                    <Layout>
                                        <Header style={{ background: '#fff', padding: 0 }}>
                                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px'}}>
                                                <Menu.Item key="1" style={{width:'180px',textAlign:'center'}}>Map</Menu.Item>
                                                <Menu.Item key="2" style={{width:'180px',textAlign:'center'}}>Add Monitor</Menu.Item>
                                                <Menu.Item key="3" style={{width:'180px',textAlign:'center'}}>Add Temperature Sensor</Menu.Item>
                                                <Menu.Item key="4" style={{width:'180px',textAlign:'center'}}>Add Humidity Sensor</Menu.Item>
                                            </Menu>
                                        </Header>
                                        <Layout>
                                            <Sider width={400} style={{ background: '#fff'}}>
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

                                            <Content style={{ background: '#fff', padding: 0 }}>
                                                <div style={{ padding: 24, background: '#fff', minHeight: 500 }}>
                                                    <center><img src={sensorLocation} className="sensorLocation" alt="sensorLocation" /></center>
                                                </div>
                                            </Content>

                                            <Sider width={400} style={{ background: '#fff'}}>
                                                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} style={{textAlign:'left', minHeight: 500, width:'500px'}}>
                                                    <SubMenu key="Temperature sensor" title={<span><Icon type="down-square-o" /><span className="nav-text">Temperature sensor</span></span>}>
                                                        <Menu.Item key="1">
                                                            <Icon type="tool" />
                                                            <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
                                                            <span className="nav-text"> Temperature sensor 1</span>
                                                        </Menu.Item>
                                                        <Menu.Item key="2">
                                                            <Icon type="tool" />
                                                            <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
                                                            <span className="nav-text"> Temperature sensor 2</span>
                                                        </Menu.Item>
                                                        <Menu.Item key="3">
                                                            <Icon type="tool" />
                                                            <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
                                                            <span className="nav-text"> Temperature sensor 3</span>
                                                        </Menu.Item>
                                                    </SubMenu>
                                                    <SubMenu key="Humidity sensor" title={<span><Icon type="down-square-o" /><span className="nav-text">Humidity sensor</span></span>}>
                                                        <Menu.Item key="1">
                                                            <Icon type="tool" />
                                                            <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
                                                            <span className="nav-text"> Humidity sensor 1</span>
                                                        </Menu.Item>
                                                        <Menu.Item key="2">
                                                            <Icon type="tool" />
                                                            <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
                                                            <span className="nav-text"> Humidity sensor 2</span>
                                                        </Menu.Item>
                                                        <Menu.Item key="3">
                                                            <Icon type="tool" />
                                                            <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
                                                            <span className="nav-text"> Humidity sensor 3</span>
                                                        </Menu.Item>
                                                    </SubMenu>
                                                    <SubMenu key="Monitor" title={<span><Icon type="down-square-o" /><span className="nav-text">Monitor</span></span>}>
                                                        <Menu.Item key="1">
                                                            <Icon type="eye" />
                                                            <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
                                                            <span className="nav-text"> Monitor 1</span>
                                                        </Menu.Item>
                                                        <Menu.Item key="2">
                                                            <Icon type="eye" />
                                                            <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
                                                            <span className="nav-text"> Monitor 2</span>
                                                        </Menu.Item>
                                                    </SubMenu>
                                                </Menu>
                                            </Sider>
                                        </Layout>
                                        <Footer style={{ textAlign: 'center' }}>Sensor部分</Footer>
                                    </Layout>
                                
                            </Panel>
                        </Collapse>

                        
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design Demo
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default SiderDemo;