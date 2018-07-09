import React from 'react';
import { Text, View ,Button,TextInput} from 'react-native';
import { connect } from 'react-redux';
import {get_user} from '../actions';

class Login extends React.Component{
    constructor(){
        super();
        this.state={
            email:"",
            password:""
        };
    }

    render(){
        const {get_user} = this.props;
        console.log("in login"+JSON.stringify(this.props));
        return(
            <View >
                <Text h4>Student Login</Text>
                <TextInput
                    style={{height:40}}
                    placeholder={"Type the email"}
                    onChangeText={(text)=>this.setState({"email":text})}/>
                <TextInput
                    style={{height:40}}
                    placeholder={"Type the password"}
                    onChangeText={(text)=>this.setState({"password":text})}/>
                <Button
                    onPress={() => get_user(this.state.email,this.state.password)}
                    buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
                    title="Login"
                />
                <Text h4>{this.props.user.user.email}</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, { get_user })(Login);