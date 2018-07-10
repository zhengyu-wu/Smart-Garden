import React from 'react';
import Login from './Login';

import {connect} from 'react-redux';
import UserPage from "./UserPage";

class Root extends React.Component {
    render() {
        console.log("in Root "+JSON.stringify(this.props));
        if(this.props.user.hasLogin===true){
            return(
                <UserPage/>
            );
        }
        else{
            return (
                <Login/>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};


export default connect(mapStateToProps)(Root);