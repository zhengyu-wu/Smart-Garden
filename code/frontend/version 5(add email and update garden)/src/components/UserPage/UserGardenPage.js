import React, { Component,PropTypes } from 'react';
//antd
import { Modal, Table, Icon, Switch, Radio, Form, Divider, Input, Layout, Row, Col, Popconfirm, Button } from 'antd';
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
          gardens: [],
          bordered: false,
          pagination,
          size: 'default',
          expandedRowRender,
          title: undefined,
          showHeader,
          footer,
          rowSelection: {},
          scroll: undefined,
          modalVisible: false,
        }
    }
    //state中users从后端数据库取数据初始化
    componentWillMount(){
        var params= new URLSearchParams();
        params.append('userId',1);
        axios.get(`http://localhost:8080/garden/getByUserId`,params)
            .then(res => {
                this.setState({
                    gardens: res.data,
                });
                // console.log("res.data:",res.data);
                // console.log("gardens:",this.state.users);
            })
    } 
    //更新users数据库的变化情况
    componentDidMount(){
        var params= new URLSearchParams();
        params.append('userId',1);
        axios.get(`http://localhost:8080/garden/getByUserId`,params)
            .then(res => {
                //console.log(bookAll);
                //console.log(bookAll.length);
                //if(bookAll.length===0) bookAll = res.data;
                this.setState({
                    gardens: res.data,
                });
            })
    }

    //添加花园函数
    handleAddGarden = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                
                console.log('Received values of form: ', values);
    
                var params= new URLSearchParams();
                params.append('positionX',values.positionX);
                params.append('positionY',values.positionY);
                params.append('width',values.width);
                params.append('length',values.length);
                params.append('userId',1);
                if((values.positionX!=null)&&(values.positionY!=null)&&(values.width!=null)&&(values.length!=null))
                {
                  axios.post('http://localhost:8080/garden/addGardenWithUserId',params).then((res)=>{
                    console.log(res.data);
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
      
    //修改信息对话框控制函数
    showModal = () => {
        this.setState({
        modalVisible: true,
        });
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
            <a onClick={this.showModal} href="javascript:;">Modify</a>
            <Modal title="Update Garden" visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <Form className="update-form" onSubmit={this.handleAddGarden}>
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
            <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteUserSubmit(record.gardenId)}>
                <a href="javascript:;">Delete</a>
            </Popconfirm>
            <Divider type="vertical" />
            <a href="javascript:;" className="ant-dropdown-link">
                More actions <Icon type="down" />
            </a>
            </span>
        ),
        }];
        return(
            <div>
                <div className="components-table-demo-control-bar">
                <Form layout="inline" height={window.innerHeight}>
                    <FormItem>
                        <Button type="primary" icon="plus-square-o" onClick={this.showModal} className="Add Garden" value="Add Garden">
                            Add Garden
                        </Button>
                        <Modal title="New Garden" visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                            <Form className="update-form" onSubmit={this.handleAddGarden}>
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
                <Table {...this.state} columns={columns} dataSource={this.state.gardens}/>
            </div>
        );
    }
}

const WrappedUserGardenPage = Form.create()(UserGardenPage);
export default WrappedUserGardenPage;