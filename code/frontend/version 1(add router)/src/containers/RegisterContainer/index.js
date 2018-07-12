import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import WrappedRegisterPage from '../components/RegisterPage';
import 'antd/dist/antd.css';

export function RegisterPage({registerPage}) {
    return (
      <div className="container">
          <WrappedRegisterPage registerPage={registerPage}/>
      </div>
    );
  }
  
  RegisterPage.propTypes = {
    registerPage: PropTypes.func.isRequired
  };

export default RegisterPage;