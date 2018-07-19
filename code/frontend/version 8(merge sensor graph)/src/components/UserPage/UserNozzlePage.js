import React, { Component,PropTypes } from 'react';
//antd
import { Modal, Table, Icon, Switch, Radio, Form, Divider, Input, Layout, Row, Col, Popconfirm, Button, List, Avatar, Select } from 'antd';
import 'antd/dist/antd.css';
import FormItem from 'antd/lib/form/FormItem';
const { Header,Content,Footer,Sider } = Layout;
//axios
import axios from "axios/index";
//本地Icon
import gardenIcon from '../img/gardenIcon.png';
import humiditySensorIcon from '../img/humiditySensor.png';
import temperatureSensorIcon from '../img/temperatureSensor.png';
import monitorSensorIcon from '../img/monitorSensor.png';
import ScatterChartPage from '../SensorImg/ScatterChartPage';

const ButtonGroup = Button.Group;
const Option = Select.Option;

class UserNozzlePage extends Component{
    constructor(){
        super();
        this.state = {
            userId:-1,//登录的userId
            gardens: [],//存放garden
            nozzles:[],//存放nozzles
            //   currentHumidity: [],
            //   currentTemperature: [],
            //   currentMonitor: [],
            currentGardenID: -1,
            currentGardenLength: 0,
            currentGardenWidth: 0,
            modalVisible: false,
            targetGardenId:-1,
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

    render(){
        return(
            <Layout>
                <Layout>
                    <Sider width={250} style={{ background: '#fff'}} height={window.innerHeight}>            
                        <div className="garden-list">
                            <List style={{textAlign:'center'}}
                                header="Garden"
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
                        {/*此处放喷头坐标图*/}
                        
                    </Content>
                    <Sider width={250} style={{ background: '#fff'}} height={window.innerHeight}>
                        
                    </Sider>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>Nozzle Management</Footer>
            </Layout>
        );
    }
}

const WrappedUserNozzlePage = Form.create()(UserNozzlePage);
export default WrappedUserNozzlePage;