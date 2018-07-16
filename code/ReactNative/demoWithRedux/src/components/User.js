import React from 'react';
import { Text, View } from 'react-native';
import { Card, WhiteSpace, WingBlank,Button,List } from 'antd-mobile-rn';
import {connect} from 'react-redux';
import {log_out} from "../actions";

const Item = List.Item;
const Brief = Item.Brief;

class UserCard extends React.Component<any, any> {
    render() {
        const {log_out}=this.props;
        //todo 绑定几个item onClick的路由
        return (
            <View style={{ paddingTop: 30 }}>
                <WingBlank size="lg">
                    <Card>
                        <Card.Header
                            title={this.props.user.user.username}
                            thumbStyle={{ width: 30, height: 30 }}
                            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                            extra="Welcome"
                        />
                        <Card.Body>
                            <List>
                                <Item extra={this.props.user.user.userId} arrow={'empty'}>
                                    user id
                                </Item>
                                <Item extra={this.props.user.user.username} arrow={'horizontal'} onClick={()=>{}}>
                                    name
                                </Item>
                                <Item extra={this.props.user.user.email} arrow={'horizontal'} onClick={()=>{}}>
                                    email
                                </Item>
                                <Item extra={this.props.user.user.phone} arrow={'horizontal'} onClick={()=>{}}>
                                    phone
                                </Item>
                                <Item arrow={"horizontal"} onClick={()=>{}}>
                                    statistics
                                </Item>

                            </List>
                        </Card.Body>
                        <Card.Footer
                            content={this.props.user.user.email}
                            extra="footer extra content"
                        />
                    </Card>
                </WingBlank>
                <WhiteSpace size={'lg'}/>
                <View>
                    <Button type={'primary'}  onClick={()=>{
                        this.props.navigation.navigate('ModifyUser',{
                            navigation: this.props.navigation
                        })
                    }}>
                        Modify Info
                    </Button>
                    <Button type={'primary'}  onClick={()=>{log_out()}}>
                       Log out
                    </Button>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps,{log_out})(UserCard);
