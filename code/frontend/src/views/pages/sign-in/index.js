import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'src/core/auth';
import { createSelector } from 'reselect';
import {Breadcrumb} from 'antd'

import { getAlert, alertActions } from 'src/core/alerts';
import Alert from '../../components/alert';
import WrappedLoginForm from '../../components/login-form';
import 'antd/dist/antd.css';
import './login-form.css'


export class SignIn extends Component{
  
  constructor(props) {
    super(props);
  }

  static propTypes = {
    signInWithLoginAndPassword: PropTypes.func.isRequired,
    signInWithGithub: PropTypes.func.isRequired,
    signInWithGoogle: PropTypes.func.isRequired,
    signInWithTwitter: PropTypes.func.isRequired,
    signInWithFacebook: PropTypes.func.isRequired,
    alert: PropTypes.object.isRequired,
    dismissAlert: PropTypes.func.isRequired
  };

  renderAlert() {
    const { alert } = this.props;
    return (
      <Alert
        dismiss={this.props.dismissAlert}
        display={alert.display}
        message={alert.message}
      />
    );
  }


  render() {
    return (
      <div className="container">
          <WrappedLoginForm signInWithLoginAndPassword={this.props.signInWithLoginAndPassword.bind(this)}/>
          
          

          {this.props.alert.display ? this.renderAlert() : null}
      </div>
    );
  }
}

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getAlert,
  (alert) => ({alert})
);

const mapDispatchToProps = Object.assign(
  {},
  authActions,
  alertActions
);

//export default connect(null, authActions)(SignIn);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
