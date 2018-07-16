import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import WrappedUserInfoPage from '../components/UserInfoPage';
import 'antd/dist/antd.css';

export function UserInfoPage({userInfoPage}) {
    return (
      <div className="container">
          <WrappedUserInfoPage userInfoPage={userInfoPage}/>
      </div>
    );
  }
  
  UserInfoPage.propTypes = {
    userInfoPage: PropTypes.func.isRequired
  };

export default UserInfoPage;