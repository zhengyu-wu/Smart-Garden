import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import WrappedAdminUserPage from '../components/AdminPage';
import 'antd/dist/antd.css';

export function AdminUserPage({adminUserPage}) {
    return (
      <div className="container">
          <WrappedAdminUserPage adminUserPage={adminUserPage}/>
      </div>
    );
  }
  
  AdminUserPage.propTypes = {
    adminUserPage: PropTypes.func.isRequired
  };

export default AdminUserPage;