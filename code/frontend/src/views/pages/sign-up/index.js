import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import WrappedSignUp from '../../components/sign-up';
import { authActions } from 'src/core/auth';
import 'antd/dist/antd.css';


export function SignUp({signUp}) {
  return (
    <div className="container">
        <WrappedSignUp signUp={signUp}/>
    </div>
  );
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

export default connect(null, authActions)(SignUp);
