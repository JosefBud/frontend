import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { DashLink, Layout } from 'components/Dashboard/';
import { Table } from 'react-bootstrap';

import { actions as rolesActions } from 'reducers/roles';
import { getAllRoles } from 'selectors/roles';

export class Roles extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    opt: PropTypes.object,
    roles: PropTypes.array
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.requestRoles();
  }

  render() {
    const { opt, roles } = this.props;

    return (
      <Layout pageTitle="Roles - Dashboard" header="Roles" options={opt}>
        <DashLink to="#role/add" name="Role/Add">
          Add Role
        </DashLink>
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => {
              return (
                <tr key={index}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>
                    <DashLink
                      to={'#role/users/' + role.id}
                      name="Role/Users"
                      item={{ roleId: role.id, name: role.name }}
                    >
                      Users
                    </DashLink>
                    &nbsp; | &nbsp;
                    <DashLink
                      to={`#role/${role.id}/add/user`}
                      name="Role/Add/User"
                      item={{ roleId: role.id, name: role.name }}
                    >
                      Assign
                    </DashLink>
                    &nbsp; | &nbsp;
                    <DashLink
                      to={'#role/edit' + role.id}
                      name="Role/Edit"
                      item={{ roleId: role.id, name: role.name }}
                    >
                      Edit
                    </DashLink>
                    &nbsp; | &nbsp;
                    <DashLink
                      to={'#role/delete' + role.id}
                      name="Role/Delete"
                      item={{ roleId: role.id, name: role.name }}
                    >
                      Delete
                    </DashLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <DashLink to="#role/add" name="Role/Add">
          Add Role
        </DashLink>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  roles: getAllRoles(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...rolesActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Roles);
