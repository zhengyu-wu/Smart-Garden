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
        return (
            <View style={{ paddingTop: 110 }}>
                <WingBlank size="lg">
                    <Card>
                        <Card.Header
                            title={this.props.user.user.username}
                            thumbStyle={{ width: 30, height: 30 }}
                            thumb="/Users/wuzhengyu/Desktop/demoWithRedux/src/assets/set.png"
                            extra="Welcome"
                        />
                        <Card.Body>
                            <List>
                                <Item extra={this.props.user.user.userId} arrow={'empty'}>
                                    User ID
                                </Item>
                                <Item extra={this.props.user.user.username} arrow={'horizontal'}
                                      onClick={()=>{
                                        this.props.navigation.navigate('ModifyUserName',{navigation: this.props.navigation})
                                      }
                                      }>
                                    Name
                                </Item>
                                <Item extra={this.props.user.user.email} arrow={'horizontal'} onClick={()=>{
                                    this.props.navigation.navigate('ModifyUserEmail',{navigation: this.props.navigation})
                                }}>
                                    Email
                                </Item>
                                <Item extra={this.props.user.user.phone} arrow={'horizontal'} onClick={()=>{
                                    this.props.navigation.navigate('ModifyUserPhone',{navigation: this.props.navigation})
                                }}>
                                    Phone
                                </Item>
                                <Item arrow={'horizontal'} onClick={()=>{
                                    this.props.navigation.navigate('ModifyUserPassword',{navigation: this.props.navigation})
                                }}>
                                    Change password
                                </Item>
                            </List>
                            <Button type={'primary'}  onClick={()=>{log_out()}}>
                                Log out
                            </Button>
                        </Card.Body>
                        <Card.Footer
                            //content={this.props.user.user.email}
                            //extra="footer extra content"
                        />
                    </Card>
                </WingBlank>
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
