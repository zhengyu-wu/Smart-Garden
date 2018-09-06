import React, { Component,PropTypes } from 'react';
//antd
import { Modal, Table, Icon, Switch, Radio, Form, Divider, Input, Layout, Row, Col, Popconfirm, Button, List, Avatar, Select } from 'antd';
import 'antd/dist/antd.css';
import FormItem from 'antd/lib/form/FormItem';
const { Header,Content,Footer,Sider } = Layout;
const ButtonGroup = Button.Group;
const Option = Select.Option;
//折线图插件
import LinechartPage from '../SensorImg/LinechartPage'
//axios
import axios from "axios/index";
//本地Icon
import gardenIcon from '../img/gardenIcon.png';
import humiditySensorIcon from '../img/humiditySensor.png';
import temperatureSensorIcon from '../img/temperatureSensor.png';
import monitorSensorIcon from '../img/monitorSensor.png';
import ScatterChartPage from '../SensorImg/ScatterChartPage';




class UserLinechartPage extends Component{
    constructor(){
        super();
        this.state = {
            userId:-1,//登录的userId
            gardens: [],//存放garden
            sensors:[],//存放sensor
            currentGardenID: -1,
            currentGardenLength: 0,
            currentGardenWidth: 0,
            modalVisible: false,
            targetGardenId:-1,
            targetSensorId:-1,
            targetSensorType:-1,
            sensorData:[],//存放sensorData
            chosenSensorType:0,
            timer:null,//定时器用
        }
    }
    //根据选择的sensor获取其最近20条数据
    getDataBySensorId = (sensorId,sensorType) => {
        var params= new URLSearchParams();
        if(sensorId!=-1)
        {
            if(sensorType==1)
            {
                axios.get(`http://localhost:8080/humidity/getLast15HumiDataBySensorId`,{params:{'sensorId':sensorId}})
                .then(res => {
                    //console.log("getLast15HumiData:",res.data);
                    this.setState({
                        targetSensorId:sensorId,
                        targetSensorType:sensorType,
                        sensorData: res.data,
                        chosenSensorType:sensorType,
                    });
                })
            }
            else if(sensorType==2)
            {
                axios.get(`http://localhost:8080/temperature/getLast15TempDataBySensorId`,{params:{'sensorId':sensorId}})
                .then(res => {
                    //console.log("getLast15HumiData:",res.data);
                    this.setState({
                        targetSensorId:sensorId,
                        targetSensorType:sensorType,
                        sensorData: res.data,
                        chosenSensorType:sensorType,
                    });
                })
            }
        }
    }

    //测试用函数接口
    //传入sensorId生成十条数据
    generateTestData = (sensorId) =>{
        console.log("SensorId:",sensorId);
        axios.get(`http://localhost:8080/fakeData/generateDataWithSensorId`,{params:{'sensorId':sensorId}})
            .then(res => {
                console.log("Generate Data");
        });
    }

    //定时器
    componentDidMount() {
        console.log("componentDidMount");
        this.state.timer = setInterval(function () {
            if("this.state.targetSensorId"!=-1)
            {
                this.getDataBySensorId(this.state.targetSensorId,this.state.targetSensorType);
            }
        }.bind(this),1000);
    }
    componentWillUnmount() {
        if(this.state.timer != null){
            clearInterval(this.state.timer);
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
    //根据选择的garden显示其拥有的sensor
    handleSensorByGarden = (gardenId) => {
        var params= new URLSearchParams();
        console.log("GardenId:",gardenId);
        axios.get(`http://localhost:8080/sensors/getSensorByGardenId`,{params:{'gardenId':gardenId}})
            .then(res => {
                this.setState({
                    currentGardenID: gardenId,
                    sensors: res.data,
                });
        })
        axios.get(`http://localhost:8080/garden/getByGardenId`,{params:{'gardenId':gardenId}})
            .then(res=>{
                this.setState({
                    currentGardenLength: res.data.length,
                    currentGardenWidth: res.data.width
                })
            })
    }
    //判断传感器Icon函数
    handleSensorIcon = (sensorType) => {
        if(sensorType==1)
        {
            return humiditySensorIcon;
        }
        else if(sensorType==2)
        {
            return temperatureSensorIcon;
        }
        else
        {
            return monitorSensorIcon;
        }
    }
    

    render() {

        return( 
            <Layout>
                <Layout>
                    <Sider width={300} style={{ background: '#fff'}} height={window.innerHeight}>            
                        <div className="garden-list">
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
                                    actions={[<ButtonGroup>
                                                <Button icon="caret-right" onClick={()=>this.handleSensorByGarden(item.gardenId)}/>,
                                            </ButtonGroup>]}
                                >
                                    <List.Item.Meta
                                    avatar={<Avatar src={gardenIcon} />}
                                    title={<a>{item.gardenName}</a>}
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
                    </Sider>
                    <Content style={{ background: '#fff', padding: 0  }} >
                        {/*此处放折线图*/}
                        <LinechartPage sensorData = {this.state.sensorData}
                                       sensorType = {this.state.chosenSensorType}/>
                    </Content>
                    <Sider width={300} style={{ background: '#fff'}} height={window.innerHeight}>
                        <div className="sensors-list">
                            <List style={{textAlign:'center'}}
                                header="Sensor"
                                pagination={{
                                    simple:true,
                                    onChange: (page) => {
                                      console.log(page);
                                    },
                                    pageSize: 6,
                                }}
                                dataSource={this.state.sensors}
                                renderItem={item => (
                                <List.Item key={item.sensorId}
                                           actions={[
                                            <Button icon="check" onClick={()=>this.getDataBySensorId(item.sensorId,item.sensorType)}></Button>,
                                            //生成测试数据用接口
                                            <Button onClick={()=>this.generateTestData(item.sensorId)}>生成测试数据</Button>,
                                           ]}
                                >
                                    <List.Item.Meta
                                    avatar={<Avatar src={this.handleSensorIcon(item.sensorType)} />}
                                    title={<a>{"Sensor:"+item.sensorId}</a>}
                                    description={"positionX:"+(item.positionX).toFixed(1)+" positionY:"+(item.positionY).toFixed(1)}
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
                </Layout>
                <Footer style={{ textAlign: 'center' }}>Line Chart</Footer>
            </Layout>
        );
    }
}
 
export default UserLinechartPage;