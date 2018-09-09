import React from 'react';
import { ScrollView, Text ,View} from 'react-native';
import { Button, InputItem, List,WhiteSpace,Toast} from 'antd-mobile-rn';

class ModifyEmailAdmin extends React.Component{
    constructor(props: any){
        super(props);
        this.state={
            email:this.props.navigation.state.params.item.user.email,
            emailError:false
        }
    }

    onEmailErrorClick=()=>{
        if(this.state.emailError)
            Toast.info('Please enter a valid email',1);
    };

    render(){
        return(
            <View>
                <WhiteSpace size={'lg'}/>
                <List>
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
                </List>
                <WhiteSpace size={'lg'}/>
                <Button type={'primary'} onClick={()=>{
                    this.props.navigation.state.params.onModifyInfo(
                        this.props.navigation.state.params.item.user.userId,
                        this.props.navigation.state.params.item.user.userType,
                        this.props.navigation.state.params.item.user.username,
                        this.props.navigation.state.params.item.user.phone,
                        this.state.email,
                        this.props.navigation.state.params.item.user.password,
                        this.props.navigation.state.params.item.user.userState);
                    this.props.navigation.goBack();
                }}
                        disabled={this.state.email === '' || typeof(this.state.email) === 'undefined' || this.state.emailError}>
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


export default ModifyEmailAdmin;