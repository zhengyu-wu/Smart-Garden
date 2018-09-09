import React, { Component,PropTypes } from 'react';
//antd
import { Modal, Table, Icon, Switch, Radio, Form, Divider, Input, Layout, Row, Col, Popconfirm, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import FormItem from 'antd/lib/form/FormItem';
const { Header,Content,Footer,Sider } = Layout;
//axios
import axios from "axios/index";
//列表样式用
const expandedRowRender = record => <p>{record.description}</p>;
const showHeader = true;
const footer = () => 'User Table';
const scroll = { y: 240 };
const pagination = { position: 'bottom' };


class UserGardenPage extends Component{
    constructor(){
        super();
        this.state = {
            userId:-1,//登录的userId
            gardens: [],//储存后端取出的garden
            bordered: true,
            pagination,
            size: 'default',
            expandedRowRender,
            title: undefined,
            showHeader,
            footer,
            rowSelection: {},
            scroll: undefined,
            addmodalVisible: false,
            updatemodalVisible: false,
            chosenGardenId:-1,//被选中的garden
            autoConfiguration:false,//是否启用一键配置
        }
    }
    //可编辑表格用函数
    isEditing = (record) => {
    return record.key === this.state.editingKey;
    };

    edit(key) {
    this.setState({ editingKey: key });
    }

    save(form, key) {
    form.validateFields((error, row) => {
        if (error) {
        return;
        }
        const newData = [...this.state.data];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ data: newData, editingKey: '' });
        } else {
        newData.push(data);
        this.setState({ data: newData, editingKey: '' });
        }
    });
    }

    cancel = () => {
    this.setState({ editingKey: '' });
    };

    //添加花园函数
    handleAddGarden = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                
                console.log('Received values of form: ', values);
                
                var params= new URLSearchParams();
                params.append('gardenName',values.gardenName);
                params.append('positionX',values.positionX);
                params.append('positionY',values.positionY);
                params.append('width',values.width);
                params.append('length',values.length);
                params.append('userId',this.state.userId);
                if((values.positionX!=null)&&(values.positionY!=null)&&(values.width!=null)&&(values.length!=null))
                {
                    //添加garden至后端数据库
                  axios.post('http://localhost:8080/garden/addGardenWithUserId',params).then((res)=>{
                    console.log(res.data);
                    var gardenId=res.data.gardenId;

                    //是否一键配置花园
                    if(this.state.autoConfiguration==true)
                    {
                        var radius=10;//设置半径为10m
                        var separation=1.414*radius;//设置传感器喷头两两最短间距位根号二*radius
                        var intercept=separation*0.866//两排间的距离
                        //长宽方向上的喷头个数
                        var num_l=(Math.floor(values.length/(2*separation)))*2+1;
                        var num_w=(Math.floor(values.width/(2*separation)))*2+1;
                        //相对中心的个数位置
                        var oppo_num_l_0=Math.floor(values.length/(2*separation));
                        var oppo_num_l_1=Math.floor((values.length-separation)/(2*separation));
                        var oppo_num_w=Math.floor(values.width/(2*separation));
                        //中心点坐标
                        var initPositionX=values.length/2;
                        var initPositionY=values.width/2;
                        var position = [{"positionX":initPositionX,"positionY":initPositionY}];
                        //中心横轴
                        for(var i=1;i<=oppo_num_l_0;i++)
                        {
                            position.push({"positionX":initPositionX+i*separation,"positionY":initPositionY});
                            position.push({"positionX":initPositionX-i*separation,"positionY":initPositionY})
                        }
                        //向上下扩展
                        for(var i=1;i<=oppo_num_w;i++)
                        {
                            if(i%2==0)
                            {
                                for(var j=1;j<=oppo_num_l_0;j++)
                                {
                                    position.push({"positionX":initPositionX+j*separation,"positionY":initPositionY+i*intercept});
                                    position.push({"positionX":initPositionX-j*separation,"positionY":initPositionY+i*intercept});
                                    position.push({"positionX":initPositionX+j*separation,"positionY":initPositionY-i*intercept});
                                    position.push({"positionX":initPositionX-j*separation,"positionY":initPositionY-i*intercept});
                                }
                            }
                            else
                            {
                                position.push({"positionX":initPositionX+separation/2,"positionY":initPositionY+i*intercept});
                                position.push({"positionX":initPositionX-separation/2,"positionY":initPositionY+i*intercept});
                                position.push({"positionX":initPositionX+separation/2,"positionY":initPositionY-i*intercept});
                                position.push({"positionX":initPositionX-separation/2,"positionY":initPositionY-i*intercept});
                                for(var j=1;j<oppo_num_l_1;j++)
                                {
                                    position.push({"positionX":initPositionX+separation/2+j*separation,"positionY":initPositionY+i*intercept});
                                    position.push({"positionX":initPositionX-separation/2-j*separation,"positionY":initPositionY+i*intercept});
                                    position.push({"positionX":initPositionX+separation/2+j*separation,"positionY":initPositionY-i*intercept});
                                    position.push({"positionX":initPositionX-separation/2-j*separation,"positionY":initPositionY-i*intercept});
                                }
                            }
                        }
                        //添加湿度传感器
                        for(var i=0;i<position.length;i++)
                        {
                            var params= new URLSearchParams();
                            params.append('positionX',position[i].positionX);
                            params.append('positionY',position[i].positionY);
                            params.append('sensorType',1);
                            params.append('gardenId',gardenId);
                            if((position[i].positionX!=null)&&(position[i].positionY!=null)&&(gardenId!=null))
                            {
                                axios.post('http://localhost:8080/sensors/addSensorWithGardenId',params).then((res)=>{
                            }).catch(err=>{
                                alert("unexpected error in add humi-sensor ");
                            });
                            }
                        }

                        //添加温度传感器
                        for(var i=0;i<position.length;i++)
                        {
                            var params= new URLSearchParams();
                            params.append('positionX',position[i].positionX);
                            params.append('positionY',position[i].positionY);
                            params.append('sensorType',2);
                            params.append('gardenId',gardenId);
                            if((position[i].positionX!=null)&&(position[i].positionY!=null)&&(gardenId!=null))
                            {
                                axios.post('http://localhost:8080/sensors/addSensorWithGardenId',params).then((res)=>{
                            }).catch(err=>{
                                alert("unexpected error in add temp-sensor ");
                            });
                            }
                        }

                        //添加监控
                        var monitorPosition = [{"positionX":0,"positionY":0},{"positionX":values.length,"positionY":0},{"positionX":0,"positionY":values.width},{"positionX":values.length,"positionY":values.width}];
                        for(var i=0;i<monitorPosition.length;i++)
                        {
                            var params= new URLSearchParams();
                            params.append('positionX',monitorPosition[i].positionX);
                            params.append('positionY',monitorPosition[i].positionY);
                            params.append('sensorType',3);
                            params.append('gardenId',gardenId);
                            if((monitorPosition[i].positionX!=null)&&(monitorPosition[i].positionY!=null)&&(gardenId!=null))
                            {
                                axios.post('http://localhost:8080/sensors/addSensorWithGardenId',params).then((res)=>{
                            }).catch(err=>{
                                alert("unexpected error in add monitor-sensor ");
                            });
                            }
                        }

                        //添加喷头
                        for(var i=0;i<position.length;i++)
                        {
                            var params= new URLSearchParams();
                            params.append('positionX',position[i].positionX);
                            params.append('positionY',position[i].positionY);
                            params.append('nozzleState',1);
                            params.append('radius',10);
                            params.append('gardenId',gardenId);
                            if((position[i].positionX!=null)&&(position[i].positionY!=null)&&(gardenId!=null))
                            {
                            axios.post('http://localhost:8080/nozzles/addNozzleByGardenId',params).then((res)=>{
                            }).catch(err=>{
                                alert("unexpected error in add nozzles ");
                            });
                            }
                        }
                    }

                    //刷新该页面的state显示新加入的garden
                    axios.get(`http://localhost:8080/garden/getByUserId`,{params:{'userId':this.state.userId}})
                    .then(res => {
                        this.setState({
                            gardens: res.data,
                            addmodalVisible: false,
                        });
                        // console.log("res.data:",res.data);
                        // console.log("gardens:",this.state.users);
                    })
                    alert('add garden successfully');
                    //更新redux信息
                  }).catch(err=>{
                    alert("unexpected error in add garden ");
                  });
                }
                else
                {
                  alert('add garden failed');
                }
    
                
            }
        });
    }
    //花园删除提交
    deleteGardenSubmit = (gardenId) => {
        console.log('delete function');
        //e.preventDefault();

        var params= new URLSearchParams();
        params.append('gardenId',gardenId);

        axios.post('http://localhost:8080/garden/deleteByGardenId',params).then((res)=>{
        console.log(res.data);
        axios.get(`http://localhost:8080/garden/getByUserId`,{params:{'userId':this.state.userId}})
            .then(res => {
                this.setState({
                    gardens: res.data,
                });
            })
        alert('delete successfully');
        //更新redux信息
        });
    }
    //花园修改提交
    handleUpdateGarden = (gardenId) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                
                console.log('Received values of form: ', values);
                
                var params= new URLSearchParams();
                params.append('gardenId',gardenId);
                params.append('gardenName',values.gardenName);
                params.append('positionX',values.positionX);
                params.append('positionY',values.positionY);
                params.append('width',values.width);
                params.append('length',values.length);
                params.append('user',parseInt(this.state.userId));

                if((values.positionX!=null)&&(values.positionY!=null)&&(values.width!=null)&&(values.length!=null))
                {
                  axios.post('http://localhost:8080/garden/updateGarden',params).then((res)=>{
                    console.log(res.data);
                    axios.get(`http://localhost:8080/garden/getByUserId`,{params:{'userId':this.state.userId}})
                    .then(res => {
                        this.setState({
                            gardens: res.data,
                            updatemodalVisible: false,
                        });
                    })
                    alert('update garden successfully');
                    //更新redux信息
                  }).catch(err=>{
                    alert("unexpected error in update garden ");
                  });
                }
                else
                {
                  alert('update garden failed');
                }
    
                
            }
        });
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
    //根据登录的userId从后端取出对应的gardens进行更新
    componentDidMount(){
        var params= new URLSearchParams();
        axios.get(`http://localhost:8080/garden/getByUserId`,{params:{'userId':this.state.userId}})
            .then(res => {
                this.setState({
                    gardens: res.data,
                });
            })
    }

    //设置是否一键配置
    setautoConfiguration = () => {
        if(this.state.autoConfiguration==false)
        {
            this.setState({
                autoConfiguration:true,
                
            });
            console.log("autoConfiguration:",this.state.autoConfiguration);
        }
        else
        {
            this.setState({
                autoConfiguration:false,
            });
            console.log("autoConfiguration:",this.state.autoConfiguration);
        }
        
    }
      
    //添加花园对话框控制函数
    showAddModal = () => {
        this.setState({
        addmodalVisible: true,
        });
    }
    handleAddOk = (e) => {
        console.log(e);
        this.setState({
        addmodalVisible: false,
        });
    }
    handleAddCancel = (e) => {
        console.log(e);
        this.setState({
        addmodalVisible: false,
        });
    }
    //修改花园对话框控制函数
    showUpdateModal = (gardenId) => {
        this.setState({
        chosenGardenId:gardenId,
        updatemodalVisible: true,
        });
    }
    handleUpdateOk = (e) => {
        console.log(e);
        this.setState({
        updatemodalVisible: false,
        });
    }
    handleUpdateCancel = (e) => {
        console.log(e);
        this.setState({
        updatemodalVisible: false,
        });
    }
    
    //按钮渲染相关函数
    handleToggle = (prop) => {
        return (enable) => {
        this.setState({ [prop]: enable });
        };
    }

    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }

    handleExpandChange = (enable) => {
        this.setState({ expandedRowRender: enable ? expandedRowRender : undefined });
    }

    handleHeaderChange = (enable) => {
        this.setState({ showHeader: enable ? showHeader : false });
    }

    handleFooterChange = (enable) => {
        this.setState({ footer: enable ? footer : undefined });
    }

    handleRowSelectionChange = (enable) => {
        this.setState({ rowSelection: enable ? {} : undefined });
    }

    handleScollChange = (enable) => {
        this.setState({ scroll: enable ? scroll : undefined });
    }

    handlePaginationChange = (e) => {
        const { value } = e.target;
        this.setState({
        pagination: value === 'none' ? false : { position: value },
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
        //列表样式
        const columns = [{
        title: 'GardenId',
        dataIndex: 'gardenId',
        key: 'gardenId',
        width: 100,
        },{
        title: 'GardenName',
        dataIndex: 'gardenName',
        key: 'gardenName',
        width: 100,
        },{
        title: 'PositionX',
        dataIndex: 'positionX',
        key: 'positionX',
        width: 100,
        },{
        title: 'PositionY',
        dataIndex: 'positionY',
        key: 'positionY',
        width: 100,
        },{
        title: 'Width',
        dataIndex: 'width',
        key: 'width',
        width: 100,
        },{
        title: 'Length',
        dataIndex: 'length',
        key: 'length',
        width: 100,
        },{
        title: 'Action',
        key: 'action',
        width: 400,
        render: (text, record) => (
            <span>
            {/*通过对话窗表单提交修改数据*/}
            <a onClick={()=>this.showUpdateModal(record.gardenId)} href="javascript:;">Modify</a>
            <Modal title="Update Garden" visible={this.state.updatemodalVisible} onOk={this.handleUpdateOk} onCancel={this.handleUpdateCancel}>
                <Form className="update-form" onSubmit={()=>this.handleUpdateGarden(this.state.chosenGardenId)}>
                {console.log("Modify GardenId:",this.state.chosenGardenId)}
                    <FormItem
                        {...formItemLayout} 
                        label="GardenName"
                    >
                        {getFieldDecorator('gardenName', {
                                rules: [{ required: true, message: 'Please input gardenName!', whitespace: true }],
                            })(
                            <Input prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="GardenName"
                            type="gardenName"
                            required
                            />
                        )}
                    </FormItem>
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
                        label="Width"
                    >
                        {getFieldDecorator('width', {
                            rules: [{ required: true, message: 'Please input width!', whitespace: true }],
                        })(
                        <Input prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Width"
                        type="width"
                        required
                        />
                        )}  
                    </FormItem>
                    <FormItem
                        {...formItemLayout} 
                        label="Length"
                    >
                        {getFieldDecorator('length', {
                                rules: [{ required: true, message: 'Please input length!' }],
                            })(
                            <Input prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Length"
                            type="length"
                            required
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <Row>
                        <Col span="8"></Col>
                        <Col span="8">
                            <Input type="submit" value="Update"/>
                        </Col>
                        <Col span="8"></Col>
                        </Row>
                    </FormItem>
                </Form>
            </Modal>
            <Divider type="vertical" />
            <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteGardenSubmit(record.gardenId)}>
                <a href="javascript:;">Delete</a>
            </Popconfirm>
            <Divider type="vertical" />
            {/* <a href="javascript:;" className="ant-dropdown-link">
                More actions <Icon type="down" />
            </a> */}
            </span>
        ),
        }];
        return(
            <div>
                <div className="components-table-demo-control-bar">
                <Form layout="inline">
                    <FormItem>
                        <span style={{paddingLeft:'4%'}}>
                            <Button type="primary" icon="plus-square-o" onClick={this.showAddModal} className="Add Garden" value="Add Garden">
                                New Garden
                            </Button>
                        </span>
                        <Modal title="New Garden" visible={this.state.addmodalVisible} onOk={this.handleAddOk} onCancel={this.handleAddCancel}>
                            <Form className="add-form" onSubmit={this.handleAddGarden}>
                                <FormItem
                                    {...formItemLayout} 
                                    label="GardenName"
                                >
                                    {getFieldDecorator('gardenName', {
                                            rules: [{ required: true, message: 'Please input gardenName!', whitespace: true }],
                                        })(
                                        <Input prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="GardenName"
                                        type="gardenName"
                                        required
                                        />
                                    )}
                                </FormItem>
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
                                    label="Width"
                                >
                                    {getFieldDecorator('width', {
                                        rules: [{ required: true, message: 'Please input width!', whitespace: true }],
                                    })(
                                    <Input prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Width"
                                    type="width"
                                    required
                                    />
                                    )}  
                                </FormItem>
                                <FormItem
                                    {...formItemLayout} 
                                    label="Length"
                                >
                                    {getFieldDecorator('length', {
                                            rules: [{ required: true, message: 'Please input length!' }],
                                        })(
                                        <Input prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Length"
                                        type="length"
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
                                    <Checkbox
                                        onChange={this.setautoConfiguration}
                                        checked={this.state.autoConfiguration}
                                    >
                                        Auto-Configuration
                                    </Checkbox>
                                </FormItem>
                            </Form>
                        </Modal>  
                    </FormItem>
                    <FormItem label="Bordered">
                    <Switch checked={state.bordered} onChange={this.handleToggle('bordered')} />
                    </FormItem>
                    <FormItem label="Column Header">
                    <Switch checked={!!state.showHeader} onChange={this.handleHeaderChange} />
                    </FormItem>
                    <FormItem label="Footer">
                    <Switch checked={!!state.footer} onChange={this.handleFooterChange} />
                    </FormItem>
                    <FormItem label="Expandable">
                    <Switch checked={!!state.expandedRowRender} onChange={this.handleExpandChange} />
                    </FormItem>
                    <FormItem label="Checkbox">
                    <Switch checked={!!state.rowSelection} onChange={this.handleRowSelectionChange} />
                    </FormItem>
                    <FormItem label="Fixed Header">
                    <Switch checked={!!state.scroll} onChange={this.handleScollChange} />
                    </FormItem>
                    <FormItem label="Size">
                    <Radio.Group size="default" value={state.size} onChange={this.handleSizeChange}>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="middle">Middle</Radio.Button>
                        <Radio.Button value="small">Small</Radio.Button>
                    </Radio.Group>
                    </FormItem>
                    <FormItem label="Pagination">
                    <Radio.Group
                        value={state.pagination ? state.pagination.position : 'none'}
                        onChange={this.handlePaginationChange}
                    >
                        <Radio.Button value="top">Top</Radio.Button>
                        <Radio.Button value="bottom">Bottom</Radio.Button>
                        <Radio.Button value="both">Both</Radio.Button>
                        <Radio.Button value="none">None</Radio.Button>
                    </Radio.Group>
                    </FormItem>
                </Form>
                </div>
                <Table style={{ minHeight: window.innerHeight/1.2 }} {...this.state} columns={columns} dataSource={this.state.gardens}/>
            </div>
        );
    }
}

const WrappedUserGardenPage = Form.create()(UserGardenPage);
export default WrappedUserGardenPage;