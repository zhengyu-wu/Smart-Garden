import React from 'react';
import { ScrollView, Text ,View} from 'react-native';
import { Button, InputItem, List,WhiteSpace,Toast} from 'antd-mobile-rn';
import {modifyUser} from "../../actions";
import { connect } from 'react-redux';

class ModifyUserEmail extends React.Component{
    constructor(props: any){
        super(props);
        this.state={
            email:this.props.user.user.email,
            emailError:false
        }
    }

    onEmailErrorClick=()=>{
        if(this.state.emailError)
            Toast.info('Please enter a valid email',1);
    };

    render(){
        const {modifyUser}=this.props;

        return(
            <View>
                <WhiteSpace size={'lg'}/>
                <InputItem
                    clear
                    value={this.state.email}
                    error={this.state.emailError}
                    onErrorClick={this.onEmailErrorClick}
                    onChange={(value)=>{
                        if(value.indexOf("@")>0){
                            this.setState({
                                email:value,
                                emailError:false
                            })
                        }
                        else{
                            this.setState({
                                email:value,
                                emailError:true
                            })
                        }
                    }}
                    placeholder={'Email'}
                />
                <WhiteSpace size={'lg'}/>
                <Button type={'primary'} onClick={()=>{
                    modifyUser(
                        this.props.user.user.userId,
                        this.props.user.user.userType,
                        this.props.user.user.username,
                        this.props.user.user.phone,
                        this.state.email,
                        this.props.user.user.password);
                    this.props.navigation.goBack();
                }}
                        disabled={this.state.email===''||!this.state.emailError? true:false}>
                    Submit
                </Button>
                <WhiteSpace size={'lg'}/>
                <Button type={'primary'} onClick={()=>{
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

export default connect(mapStateToProps,{modifyUser})(ModifyUserEmail);