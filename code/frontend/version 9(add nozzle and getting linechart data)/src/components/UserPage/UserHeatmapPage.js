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


class UserHeatmapPage extends Component{
    constructor(){
        super();
        this.state = {
            userId:-1,//登录的userId
            gardens: [],
        }
    }

    //根据登录的userId从后端取出对应的gardens进行初始化
    componentWillMount(){
        var params= new URLSearchParams();
        console.log("LoginUserId:",localStorage.getItem('userID'));
        axios.get(`http://localhost:8080/garden/getByUserId`,{params:{'userId':localStorage.getItem('userID')}})
            .then(res => {
                this.setState({
                    userId:localStorage.getItem('userID'),
                    gardens: res.data,
                });
        })
    } 
    //根据登录的userId从后端取出对应的gardens进行gengxin
    componentDidMount(){
        var params= new URLSearchParams();
        axios.get(`http://localhost:8080/garden/getByUserId`,{params:{'userId':this.state.userId}})
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
                <Sider width={250} style={{ background: '#fff'}} height={window.innerHeight}>
                <div className="demo-infinite-container">
                    <List style={{textAlign:'center'}}
                        header="Garden"
                        dataSource={this.state.gardens}
                        renderItem={item => (
                        <List.Item key={item.gardenId}>
                            <List.Item.Meta
                            avatar={<Avatar src={gardenIcon} />}
                            title={<a href=" ">{item.gardenName}</a>}
                            description={<a><li>{"length:"+item.length}</li><li>{"width:"+item.width}</li></a>}
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
                </Sider>
                <Content style={{ background: '#fff', padding: 0  }}>
                    {/*此处放热力图*/}
                    <HeatmapPage/>
                </Content>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>Heat Map</Footer>
            </Layout>
        );
    }
}

export default UserHeatmapPage;