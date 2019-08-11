import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import {
  Flavors,
  Home,
  Migrations,
  NotFound,
  Roles,
  RoleAdd,
  RoleEdit,
  RoleDelete,
  RoleUsers,
  RoleAddUser,
  Users,
  UserRoles
} from '.';

import { actions as dashboardActions } from 'reducers/dashboard';
import { getDashboardComponent } from 'selectors/dashboard';

class Main extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    dashboardComponent: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
  }
  display() {
    const { dashboardComponent } = this.props;
    const { name, item } = dashboardComponent;
    const defaultOpts = {
      border: false,
      header: true,
      title: false,
      style: {}
    };

    switch (name) {
      case 'Home':
        return <Home />;
      case 'Flavors':
        return <Flavors opt={defaultOpts} />;
      case 'Migrations':
        return <Migrations opt={defaultOpts} />;
      case 'Roles':
        return <Roles opt={defaultOpts} />;
      case 'Role/Add':
        return <RoleAdd opt={defaultOpts} />;
      case 'Role/Edit':
        return (
          <RoleEdit opt={defaultOpts} roleId={item.roleId} name={item.name} />
        );
      case 'Role/Delete':
        return (
          <RoleDelete opt={defaultOpts} roleId={item.roleId} name={item.name} />
        );
      case 'Role/Users':
        return <RoleUsers opt={defaultOpts} roleId={item} />;
      case 'Role/Add/User':
        return (
          <RoleAddUser
            opt={defaultOpts}
            roleId={item.roleId}
            name={item.name}
          />
        );
      case 'Users':
        return <Users opt={defaultOpts} />;
      case 'User/Roles':
        return <UserRoles opt={defaultOpts} userId={item} />;
      default:
        return <NotFound opt={defaultOpts} name={name} />;
    }
  }
  render() {
    return <Fragment>{this.display()}</Fragment>;
  }
}

const mapStateToProps = state => ({
  dashboardComponent: getDashboardComponent(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...dashboardActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
