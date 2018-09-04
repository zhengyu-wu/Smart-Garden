import React from 'react';
import { ScrollView, Text ,View} from 'react-native';
import { Button, InputItem, List,WhiteSpace,Toast} from 'antd-mobile-rn';
import {modifyUser} from "../../actions";
import { connect } from 'react-redux';

class ModifyUserPhone extends React.Component{
    constructor(props: any){
        super(props);
        this.state={
            phone:this.props.user.user.phone
        }
    }

    render(){
        const {modifyUser}=this.props;

        return(
            <View style={{ paddingTop: 120 }}>
                <WhiteSpace size={'lg'}/>
                <List>
                <InputItem
                    clear
                    value={this.state.phone}
                    onChange={
                        (value)=>{
                            this.setState({phone:value})
                        }
                    }
                    placeholder={'username'}
                />
                </List>
                <WhiteSpace size={'lg'}/>
                <Button style={{top: 50}} type={'primary'} onClick={()=>{
                    modifyUser(
                        this.props.user.user.userId,
                        this.props.user.user.userType,
                        this.props.user.user.username,
                        this.state.phone,
                        this.props.user.user.email,
                        this.props.user.user.password);
                    this.props.navigation.goBack();
                }}
                        disabled={this.state.phone===''? true:false}>
                    Submit
                </Button>
                <WhiteSpace size={'lg'}/>
                <Button style={{top: 50}} type={'primary'} onClick={()=>{
                    this.props.navigation.goBack();
                }}>
                    Cancel
                </Button>
            </View>
        )
    }
}

mapStateToProps= (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps,{modifyUser})(ModifyUserPhone);