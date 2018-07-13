import React from 'react';
import { Text, View } from 'react-native';
import { Card, WhiteSpace, WingBlank,Button } from 'antd-mobile-rn';
import {connect} from 'react-redux';
import {log_out} from "../actions";

class UserCard extends React.Component<any, any> {
    render() {
        const {log_out}=this.props;
        return (
            <View style={{ paddingTop: 30 }}>
                <WingBlank size="lg">
                    <Card>
                        <Card.Header
                            title={this.props.user.user.username}
                            thumbStyle={{ width: 30, height: 30 }}
                            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                            extra="this is extra"
                        />
                        <Card.Body>
                            <View style={{ height: 42 }}>
                                <Text style={{ marginLeft: 16 }}>Card Content</Text>
                            </View>
                        </Card.Body>
                        <Card.Footer
                            content={this.props.user.user.email}
                            extra="footer extra content"
                        />
                    </Card>
                </WingBlank>
                <View>
                    <Button type={'primary'} onClick={()=>{log_out()}}>
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
