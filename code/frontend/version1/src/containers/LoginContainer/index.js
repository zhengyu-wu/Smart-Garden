import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import WrappedLoginPage from '../components/LoginPage';
import 'antd/dist/antd.css';

export function LoginPage({loginPage}) {
    return (
      <div className="container">
          <WrappedLoginPage loginPage={loginPage}/>
      </div>
    );
  }
  
  LoginPage.propTypes = {
    loginPage: PropTypes.func.isRequired
  };

export default LoginPage;