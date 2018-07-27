import React, { Component,PropTypes } from 'react';
//antd          
import { Icon, Menu, Layout, List, message, Avatar, Spin, Button } from 'antd';
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
            gardenData:[],
            //被勾选的garden属性
            targetGardenId:-1,
            targetGardenLength:0,
            targetGardenWidth:0,
        }
    }
    //传入gardenId生成十条数据
    generateTestData = (gardenId) =>{
        console.log("GardenId:",gardenId);
        axios.get(`http://localhost:8080/fakeData/generateDataWithGardenId`,{params:{'gardenId':gardenId}})
            .then(res => {
                console.log("Generate Data");
                this.setState({
                    targetGardenId:gardenId,
                });
        });
    }
    //根据选择的garden获取其最近数据
    getDataByGardenId = (gardenId,length,width) => {
        var params= new URLSearchParams();
        if(gardenId!=-1)
        {
            axios.get(`http://localhost:8080/temperature/getLastTempDataByGardenId`,{params:{'gardenId':gardenId}})
                .then(res => {
                    this.setState({
                        targetGardenId:gardenId,
                        targetGardenLength:length,
                        targetGardenWidth:width,
                        gardenData: res.data,
                    });
            })
        }
    }
    //定时器
    componentDidMount() {
        console.log("componentDidMount");
        this.state.timer = setInterval(function () {
            if("this.state.targetGardenId"!=-1)
            {
                this.getDataByGardenId(this.state.targetGardenId,this.state.targetGardenLength,this.state.targetGardenWidth);
            }
        }.bind(this),3000);
        this.state.timer_data = setInterval(function () {
            if("this.state.targetGardenId"!=-1)
            {
                this.generateTestData(this.state.targetGardenId);
            }
        }.bind(this),3000);
    }
    componentWillUnmount() {
        if(this.state.timer != null){
            clearInterval(this.state.timer);
        }
        if(this.state.timer_data != null){
            clearInterval(this.state.timer_data);
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

    render() {
        return(
            
            <Layout>
                <Layout>
                <Sider width={250} style={{ background: '#fff'}} height={window.innerHeight}>
                <div className="demo-infinite-container">
                    <List style={{textAlign:'center'}}
                        header="Garden"
                        pagination={{
                            simple:true,
                            onChange: (page) => {
                              console.log(page);
                            },
                            pageSize: 6,
                        }}
                        dataSource={this.state.gardens}
                        renderItem={item => (
                        <List.Item key={item.gardenId}
                                    actions={[
                                        <Button icon="check" onClick={()=>this.getDataByGardenId(item.gardenId,item.length,item.width)}></Button>,
                                        //生成测试数据用接口
                                        <Button onClick={()=>this.generateTestData(item.gardenId)}>生成测试数据</Button>,
                                    ]}
                        >
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
                    <HeatmapPage gardenData = {this.state.gardenData}
                                 gardenLength = {this.state.targetGardenLength}
                                 gardenWidth = {this.state.targetGardenWidth}/>
                </Content>
                <Sider width={200} style={{ background: '#fff'}} height={window.innerHeight}>
                </Sider>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>Heat Map</Footer>
            </Layout>
        );
    }
}

export default UserHeatmapPage;