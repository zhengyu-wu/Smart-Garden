import React, { Component,PropTypes } from 'react';
//antd          
import { Icon, Menu, Layout, List, message, Avatar, Spin } from 'antd';
import 'antd/dist/antd.css';
//热力图插件
import HeatmapPage from '../SensorImg/HeatmapPage'
//axios
import axios from "axios/index";
//本地Icon
import gardenIcon from '../img/gardenIcon.png';

const {Content,Footer,Sider } = Layout;
const theData = localStorage.getItem('userID');


class UserHeatmapPage extends Component{
    constructor(){
        super();
        this.state = {
          gardens: [],
        }
    }

    //根据登录的userId从后端取出对应的gardens进行初始化
    componentWillMount(){
        var params= new URLSearchParams();
        console.log("LoginUserId:",theData);
        axios.get(`http://localhost:8080/garden/getByUserId`,{params:{'userId':theData}})
            .then(res => {
                this.setState({
                    gardens: res.data,
                });
        })
    } 
    //根据登录的userId从后端取出对应的gardens进行gengxin
    componentDidMount(){
        var params= new URLSearchParams();
        axios.get(`http://localhost:8080/garden/getByUserId`,{params:{'userId':theData}})
            .then(res => {
                this.setState({
                    gardens: res.data,
                });
            })
    }

    render() {
        return(
            
            <Layout>
                <Layout>
                <Sider width={200} style={{ background: '#fff'}} height={window.innerHeight}>
                <div className="demo-infinite-container">
                    <List style={{textAlign:'center'}}
                        header="Garden"
                        dataSource={this.state.gardens}
                        renderItem={item => (
                        <List.Item key={item.gardenId}>
                            <List.Item.Meta
                            avatar={<Avatar src={gardenIcon} />}
                            title={<a href=" ">{"Garden:"+item.gardenId}</a>}
                            description={"length:"+item.length+" width:"+item.width}
                            />
                        </List.Item>
                        )}
                    >
                        {this.state.loading && this.state.hasMore && (
                        <div className="demo-loading-container">
                            <Spin />
                        </div>
                        )}
                    </List>
                </div>
                    {/* 测试用侧栏 */}
                    {/* <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} style={{textAlign:'left'}}>
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
                    </Menu> */}
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