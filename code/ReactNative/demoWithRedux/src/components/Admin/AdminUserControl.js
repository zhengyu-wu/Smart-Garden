import React,{Component} from 'react';
import {Text,View,FlatList} from 'react-native';
import {Card,List,Accordion,Switch} from 'antd-mobile-rn';
import axios from 'axios';

class AdminUserControl extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[]
        }
    }
    componentDidMount(){
        axios.get("http://192.168.56.1:8080/users/getAllUser")
            .then((res)=>{
                let tmpData=[];
                for(let i=0;i<res.data.length;i++){
                    tmpData.push({key:i,user:res.data[i]});
                }
                this.setState({users:tmpData});
            })
    }

    onChange = (key: string) => {
        console.log(key);
    }

    _renderItem=(item)=>{
        console.log("item");
        console.log(item);
        return <Card>
            <Card.Body>
                <List>
                    <List.Item
                        extra={item.item.user.userId}
                        arrow={'empty'}
                    >
                        userId
                    </List.Item>
                    <List.Item
                        extra={item.item.user.username}
                        arrow={'horizontal'}
                        onClick={()=>{}}
                    >
                        username
                    </List.Item>
                    <Accordion onChange={this.onChange} defaultActiveKey="2">
                        <Accordion.Panel header="Other Info">
                            <List>
                                <List.Item
                                    extra={item.item.user.email}
                                    arrow={'horizontal'}
                                    onClick={()=>{}}
                                >
                                    email
                                </List.Item>
                                <List.Item
                                    extra={item.item.user.phone}
                                    arrow={'horizontal'}
                                    onClick={()=>{}}
                                >
                                    phone
                                </List.Item>
                                <List.Item
                                    extra={item.item.user.userType}
                                    arrow={'horizontal'}
                                    onClick={()=>{}}
                                >
                                    userType
                                </List.Item>
                                <List.Item extra={
                                    <Switch
                                        checked ={item.item.user.userState===1}
                                        onChange={()=>{
                                            //todo 这里应该是修改用户激活状态的函数
                                             } }
                                    />
                                }
                                >
                                    activation
                                </List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                </List>
            </Card.Body>
        </Card>;
    }

    _header = () => {
        return <Text>这是头部</Text>;
    }

    _footer = () => {
        return <Text>这是尾部</Text>;
    }

    _separator = () => {
        return <View style={{height:2,backgroundColor:'yellow'}}/>;
    }

    render(){
        return(
            <View style={{flex:1}}>
                <FlatList
                    ref={(flatList)=>this._flatList=flatList}
                    ListHeaderComponent={this._header}
                    ListFooterComponent={this._footer}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    onEndReachedThreshold={0}
                    numColumns={1}
                    data={this.state.users}
                    />
            </View>)
    }
}

export default AdminUserControl;