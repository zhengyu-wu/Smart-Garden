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
import nozzleIcon from '../img/nozzle.png';
import NozzlesChartPage from '../SensorImg/NozzlesChartPage';

const ButtonGroup = Button.Group;
const Option = Select.Option;

function handleChangeSelect(value) {
    console.log(`selected ${value}`);
  }

class UserNozzlePage extends Component{
    constructor(){
        super();
        this.state = {
            switchId:0,//garden自动浇灌开关的初始化控制
            userId:-1,//登录的userId
            gardens: [],//存放garden
            autoWateringGardens:[],//存放garden自动浇灌的开关状态
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
    //定时器
    componentDidMount() {
        console.log("componentDidMount");
        this.state.timer = setInterval(this.handleAutoWatering,5000);
    }
    componentWillUnmount() {
        if(this.state.timer != null){
            clearInterval(this.state.timer);
        }
    }
    //执行自动浇灌函数
    handleAutoWatering = () =>{
        axios.post('http://localhost:8080/waterConfig/runAutoWatering').then((res)=>{
            console.log("Do auto watering");
            //重新取出nozzle刷新
            var params= new URLSearchParams();
            axios.get(`http://localhost:8080/nozzles/getNozzleByGardenId`,{params:{'gardenId':this.state.currentGardenID}})
                .then(res => {
                    this.setState({
                        nozzles: res.data,
                    });
            })
        })
    }

    //添加喷头对话框控制函数
    showAddModal = (gardenId) => {
        this.setState({
        modalVisible: true,
        targetGardenId:gardenId,
        });
        console.log("targetGardenId:",gardenId);
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
        modalVisible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
        modalVisible: false,
        });
    }

    hasActiveConfig(gardenId) {
        return axios.get(`http://localhost:8080/waterConfig/hasActiveConfig`,{params:{'gardenId':gardenId}});
    }

    //根据登录的userId从后端取出对应的gardens进行初始化
    componentWillMount(){
        var params= new URLSearchParams();
        console.log("LoginUserId:",localStorage.getItem('userID'));
        axios.get(`http://localhost:8080/garden/getByUserId`,{params:{'userId':localStorage.getItem('userID')}})
            .then(res => {
                
                console.log("res.data.length:",res.data.length)
                var oldGardenData=res.data;
                var newGardenData=[];
                var gardenlistLength=res.data.length;
                //console.log("oldGardenData:",oldGardenData[1].gardenId);
                let hasActiveConfigList = [];
                for(var i=0;i<res.data.length;i++)
                {
                    hasActiveConfigList.push(this.hasActiveConfig((oldGardenData[i]).gardenId));
                }

                console.log("hasActiveConfigList:",hasActiveConfigList);

                axios.all(hasActiveConfigList)
                .then(res => {
                    console.log("Result:",res.data) // res 作为一个数组，每项对应每个请求　　
                    for(var i=0;i<gardenlistLength;i++)
                    {
                        oldGardenData[i].isConfig=res[i].data;
                    }
                    console.log("GardenInform:",oldGardenData) // res 作为一个数组，每项对应每个请求　
                    this.setState({
                        userId:localStorage.getItem('userID'),
                        gardens: oldGardenData,
                        autoWateringGardens:newGardenData,
                    });

                })



                // for(var i=0;i<res.data.length;i++)
                // {
                //     console.log("res.data.gardenId:",(oldGardenData[i]).gardenId);

                //     axios.get(`http://localhost:8080/waterConfig/getConfigByGardenId`,{params:{'gardenId':(oldGardenData[i]).gardenId}})
                //     .then((response)=>{
                //         if(response.data.length>0)
                //         {
                //             var gardenDataItem="1";
                //             newGardenData.push(gardenDataItem);
                //         }
                //         else
                //         {
                //             var gardenDataItem="0";
                //             newGardenData.push(gardenDataItem);
                //         }
                //     });
                // }
                
        })
    }

    //处理garden的autoWatering开关初始状态
    initAutoWateringSwitch = (switchId) =>{
        var result=false;
        if(this.state.autoWateringGardens[switchId]=="1")
        {
            result=true;
        }
        this.setState({
            switchId:switchId+1,
        })
        return result;
    } 
    //根据选择的garden显示其拥有的nozzle
    handleNozzleByGarden = (gardenId) => {
        var params= new URLSearchParams();
        console.log("GardenId:",gardenId);
        axios.get(`http://localhost:8080/nozzles/getNozzleByGardenId`,{params:{'gardenId':gardenId}})
            .then(res => {
                this.setState({
                    currentGardenID: gardenId,
                    nozzles: res.data,
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
    //根据选择的garden和nozzle信息添加nozzle
    handleAddNozzle = (gardenId) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var params= new URLSearchParams();
                params.append('positionX',values.positionX);
                params.append('positionY',values.positionY);
                params.append('nozzleState',values.nozzleState);
                params.append('radius',values.radius);
                params.append('gardenId',gardenId);
                if((values.positionX!=null)&&(values.positionY!=null)&&(values.nozzleState!=null)&&(values.radius!=null))
                {
                  axios.post('http://localhost:8080/nozzles/addNozzleByGardenId',params).then((res)=>{
                    console.log(res.data);
                    axios.get(`http://localhost:8080/nozzles/getNozzleByGardenId`,{params:{'gardenId':gardenId}})
                    .then(res => {
                        this.setState({
                            nozzles: res.data,
                        });
                    })
                    alert('add nozzles successfully');
                    //更新redux信息
                  }).catch(err=>{
                    alert("unexpected error in add nozzles ");
                  });
                }
                else
                {
                  alert('add nozzles failed');
                }
    
                
            }
        });
    }
    //根据选择的nozzleId删除指定的nozzle
    handleDeleteNozzle = (nozzleId) => {
        //获取修删除nozzle所在的gardenId
        axios.get(`http://localhost:8080/nozzles/getNozzleByNozzleId`,{params:{'nozzleId':nozzleId}})
                    .then((response)=>{
                        var updateGardenId=response.data.garden.gardenId;
                        var params= new URLSearchParams();
                        params.append('nozzleId',response.data.nozzleId);
                        axios.post('http://localhost:8080/nozzles/deleteNozzleByNozzleId',params).then((res)=>{
                        console.log(res.data);
                        axios.get(`http://localhost:8080/nozzles/getNozzleByGardenId`,{params:{'gardenId':updateGardenId}})
                            .then(res => {
                                this.setState({
                                    nozzles: res.data,
                                });
                            })
                        alert('delete successfully');
                        //更新redux信息
                        });
                    });
    }
    //根据选择的nozzleId更改其nozzle
    handleUpdateNozzleState = (nozzleId) => {
        axios.get(`http://localhost:8080/nozzles/getNozzleByNozzleId`,{params:{'nozzleId':nozzleId}})
                    .then((response)=>{
                        var updateGardenId=response.data.garden.gardenId;
                        var params= new URLSearchParams();
                        params.append('nozzleId',response.data.nozzleId);
                        if(response.data.nozzleState==0)
                        {
                            params.append('state',1); 
                        }
                        else
                        {
                            params.append('state',0); 
                        }
                        
                        
                        axios.post('http://localhost:8080/nozzles/modifyStateByNozzleId',params).then((res)=>{
                            console.log("update state successfully");
                            axios.get(`http://localhost:8080/nozzles/getNozzleByGardenId`,{params:{'gardenId':updateGardenId}})
                            .then(res => {
                                this.setState({
                                    nozzles: res.data,
                                });
                            })
                        });
                    });
    }
    //自动浇灌用函数
    //根据gardenId判断是否在自动浇灌表里
    isAuto = (gardenId) => {
        axios.get(`http://localhost:8080/waterConfig/getConfigByGardenId`,{params:{'gardenId':gardenId}})
        .then((response)=>{
            var garden=response.data;
            if(garden.length>0)
            {
                console.log("IsAuto:",gardenId+":"+Boolean(true));
                var OnOff=true;
                return true;
            }
            else
            {
                console.log("IsAuto:",gardenId+":"+Boolean(false));
                var OnOff=false;
                return false;
            }
        });
    }
    //自动浇灌开关
    switchAutoWatering = (gardenId) =>{
        axios.get(`http://localhost:8080/waterConfig/getConfigByGardenId`,{params:{'gardenId':gardenId}})
        .then((response)=>{
            var garden=response.data;
            if(garden.length>0)
            {
                console.log("IsAuto:",gardenId+":"+Boolean(true));
                var OnOff=true;
            }
            else
            {
                console.log("IsAuto:",gardenId+":"+Boolean(false));
                var OnOff=false;
            }
            console.log("OnOff:",OnOff);
            if(OnOff===true)//若开着则关闭（从表中删除对应garden）
            {
                var params= new URLSearchParams();
                params.append('gardenId',gardenId);
                axios.post(`http://localhost:8080/waterConfig/deleteByGardenId`,params)
                .then((response)=>{
                    console.log("turn off autoWatering:",gardenId);
                });
            }
            else
            {
                var params= new URLSearchParams();
                params.append('bestTempMin',30);
                params.append('bestTempMax',35);
                params.append('bestHumiMin',0.4);
                params.append('bestHumiMax',0.6);
                params.append('gardenId',gardenId);
                axios.post('http://localhost:8080/waterConfig/addConfigByGardenId',params).then((res)=>{
                    console.log("Auto Garden:",res.data);
                });
            }
        });
        
    }

    
    render(){
        //form样式
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const state = this.state;

        return(
            <div>
            
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
                                    actions={[
                                        <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked={Boolean(item.isConfig)} onChange={()=>this.switchAutoWatering(item.gardenId)}  />,
                                        <ButtonGroup>
                                            <Button icon="plus" onClick={()=>this.showAddModal(item.gardenId)}/>,
                                            <Button icon="caret-right" onClick={()=>this.handleNozzleByGarden(item.gardenId)}/>,
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
                                <Modal title="Add Nozzle" visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                                    <Form className="addNozzle-form" onSubmit={()=>this.handleAddNozzle(this.state.targetGardenId)}>
                                        <FormItem
                                            {...formItemLayout} 
                                            label="PositionX"
                                        >
                                            {getFieldDecorator('positionX', {
                                                    rules: [{ required: true, message: 'Please input positionX!', whitespace: true }],
                                                })(
                                                <Input prefix={<Icon type="environment-o" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                placeholder="PositionX"
                                                type="positionX"
                                                required
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout} 
                                            label="PositionY"
                                        >
                                            {getFieldDecorator('positionY', {
                                                    rules: [{ required: true, message: 'Please input positionY!', whitespace: true }],
                                                })(
                                                <Input prefix={<Icon type="environment-o" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                placeholder="PositionY"
                                                type="positionY"
                                                required
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout} 
                                            label="NozzleState"
                                        >
                                            {getFieldDecorator('nozzleState', {
                                                    rules: [{ required: true, message: 'Please input nozzleState!', whitespace: true }],
                                                })(
                                                <Select style={{ width: 120 }} onChange={handleChangeSelect}>
                                                <Option value="0">OFF</Option>
                                                <Option value="1">ON</Option>
                                                </Select>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout} 
                                            label="Radius"
                                        >
                                            {getFieldDecorator('radius', {
                                                    rules: [{ required: true, message: 'Please input radius!', whitespace: true }],
                                                })(
                                                <Input prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                placeholder="Radius"
                                                type="radius"
                                                required
                                                />
                                            )}
                                        </FormItem>
                                        
                                        <FormItem>
                                            <Row>
                                            <Col span="8"></Col>
                                            <Col span="8">
                                                <Input type="submit" value="Add"/>
                                            </Col>
                                            <Col span="8"></Col>
                                            </Row>
                                        </FormItem>
                                    </Form>
                                </Modal>
                                
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
                        <center>
                        <NozzlesChartPage currentGardenLength = {this.state.currentGardenLength}
                            gardenid = {this.state.currentGardenID}
                         currentGardenWidth = {this.state.currentGardenWidth}
                         nozzles = {this.state.nozzles} />
                         </center>
                    </Content>
                    <Sider width={300} style={{ background: '#fff'}} height={window.innerHeight}>
                        <div className="nozzle-list">
                            <List style={{textAlign:'center'}}
                                header="Nozzle"
                                pagination={{
                                    simple:true,
                                    onChange: (page) => {
                                      console.log(page);
                                    },
                                    pageSize: 6,
                                }}
                                dataSource={this.state.nozzles}
                                renderItem={item => (
                                <List.Item key={item.nozzleId} 
                                    actions={[
                                        <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked={Boolean(item.nozzleState)} checked={Boolean(item.nozzleState)} onChange={()=>this.handleUpdateNozzleState(item.nozzleId)} />,
                                        <Button type="danger" icon="minus" onClick={()=>this.handleDeleteNozzle(item.nozzleId)}/>
                                    ]}
                                    >
                                    <List.Item.Meta
                                    avatar={<Avatar src={nozzleIcon} />}
                                    title={<a>{"Nozzle:"+item.nozzleId}</a>}
                                    description={"positionX:"+(item.positionX).toFixed(1)+" positionY:"+item.positionY.toFixed(1)}
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
                <Footer style={{ textAlign: 'center' }}>Nozzle Management</Footer>
            </Layout>
            </div>
        );
    }
}

const WrappedUserNozzlePage = Form.create()(UserNozzlePage);
export default WrappedUserNozzlePage;