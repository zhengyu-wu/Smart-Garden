import React,{Component} from 'react';
import {Text,View,FlatList} from 'react-native';
import {Card,List,Accordion,Switch,Button,Toast} from 'antd-mobile-rn';
import axios from 'axios';
import qs from "qs";
import {Modal} from "antd-mobile-rn/lib/index.native";
import {HOST_NAME} from "../../constants";

class AdminUserControl extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            refreshing:false
        };
        this.onModifyInfo=this.onModifyInfo.bind(this);
        this.onButtonClick=this.onButtonClick.bind(this);
    }
    componentDidMount(){
        axios.get(HOST_NAME+"/users/getAllUser")
            .then((res)=>{
                let tmpData=[];
                for(let i=0;i<res.data.length;i++){
                    tmpData.push({key:i.toString(),user:res.data[i]});
                }
                this.setState({users:tmpData});
            })
    }

    onChange = (key: string) => {
        console.log(key);
    };

    onModifyInfo=(userId,userType,username,phone,email,password,userState)=>{
        let newData=[];
        for(let i =0;i<this.state.users.length;i++){
            if(userId!==this.state.users[i].user.userId){
                newData.push(this.state.users[i]);
            }
            else {
                newData.push({key:this.state.users[i].key,user:{
                        userId:userId,
                        userType:userType,
                        username:username,
                        phone:phone,
                        email:email,
                        password:password,
                        userState:userState
                    }})
            }
        }
        const params={
            userId:userId,
            userType:userType,
            phone:phone,
            email:email,
            password:password,
            username:username,
            userState:userState
        };
        axios.post(HOST_NAME+"/users/updateUser",qs.stringify(params))
            .then(()=>{
                this.setState({users:newData});
                console.log("in update User params: ");
                console.log(params);
            })
    }

    onButtonClick=(userId)=>{
        Modal.alert('Delete this user?', 'this operation cannot be recovered!', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
            {
                text: 'OK', onPress: () => {
                    let newData=[];
                    for(let i =0;i<this.state.users.length;i++){
                        if(userId!==this.state.users[i].user.userId){
                            newData.push(this.state.users[i]);
                        }
                    }
                    console.log('in delete');
                    console.log(userId);
                    const params = {
                        userId: userId
                    };
                    this.setState({users:newData});
                    axios.post(HOST_NAME+'/users/deleteByUserId', qs.stringify(params))
                        .then(() => {
                            Toast.info('successfully delete');
                            console.log("state after update");
                            console.log(this.state.users);
                        });
                }
            }

        ]);
    }



    _renderItem=(item)=>{
        return <Card>
            <Card.Body>
                <List>
                    <List.Item
                        extra={item.item.user.userId}
                        arrow={'empty'}
                    >
                        User Id
                    </List.Item>
                    <List.Item
                        extra={item.item.user.username}
                        arrow={'horizontal'}
                        onClick={()=>{
                            this.props.navigation.navigate('ModifyUserNameAdmin',
                                {
                                    item:item.item,
                                    onModifyInfo:this.onModifyInfo.bind(this)
                                })
                        }}
                    >
                        Username
                    </List.Item>
                    <Accordion onChange={this.onChange} defaultActiveKey="2">
                        <Accordion.Panel header="Other Info">
                            <List>
                                <List.Item
                                    extra={item.item.user.email}
                                    arrow={'horizontal'}
                                    onClick={()=>{
                                        this.props.navigation.navigate('ModifyEmailAdmin',
                                            {
                                                item:item.item,
                                                onModifyInfo:this.onModifyInfo.bind(this)
                                            })
                                    }}
                                >
                                    Email
                                </List.Item>
                                <List.Item
                                    extra={item.item.user.phone}
                                    arrow={'horizontal'}
                                    onClick={()=>{
                                        this.props.navigation.navigate('ModifyUserPhoneAdmin',
                                            {
                                                item:item.item,
                                                onModifyInfo:this.onModifyInfo.bind(this)
                                            })
                                    }}
                                >
                                    Phone
                                </List.Item>
                                <List.Item
                                    extra={item.item.user.userType===1?'Admin':'Normal'}
                                >
                                    User Type
                                </List.Item>
                                <List.Item extra={
                                    item.item.user.userState===1?'Activated':'Not verified'
                                }
                                >
                                    Activation
                                </List.Item>
                                <Button type={'warning'} onClick={()=>
                                {
                                    this.onButtonClick(item.item.user.userId);
                                }
                                }>Delete this user</Button>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                </List>
            </Card.Body>
        </Card>;
    }

    onAddUser=()=>{
        this.componentDidMount();
    }

    _header = () => {
        return <Button type={'primary'}
                       onClick={()=>
                        {//todo
                            this.props.navigation.navigate('Register',{
                                navigation: this.props.navigation,
                                onAddUser:this.onAddUser.bind(this)
                            })
                        }
                       }>
            Add user
        </Button>;
    }

    _footer = () => {
        return <Text>这是尾部</Text>;
    }

    _separator = () => {
        return <View style={{height:2}}/>;
    }

    render(){
        return(
            <View style={{flex:1}}>
                <FlatList
                    ref={(flatList)=>this._flatList=flatList}
                    ListHeaderComponent={this._header}
                    //ListFooterComponent={this._footer}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    onEndReachedThreshold={0}
                    numColumns={1}
                    data={this.state.users}
                    extraData={this.state.users}
                    refreshing={this.state.refreshing}
                    onRefresh={()=>{
                        this.setState({refreshing:true});
                        axios.get(HOST_NAME+"/users/getAllUser")
                            .then((res)=>{
                                let tmpData=[];
                                for(let i=0;i<res.data.length;i++){
                                    tmpData.push({key:i.toString(),user:res.data[i]});
                                }
                                this.setState({users:tmpData,refreshing:false});
                            })
                    }}
                    />
            </View>)
    }
}

export default AdminUserControl;