import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import DashLink from 'components/Dashboard/Link';
import { Table } from 'react-bootstrap';

import { actions as rolesActions } from 'reducers/roles';
import { getAllRoles } from 'selectors/roles';

export class Roles extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
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
    const { roles } = this.props;

    return (
      <Fragment>
        <Helmet title="Roles - Dashboard" />
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
                      to={'#roleusers/' + role.id}
                      name="RoleUsers"
                      item={role.id}
                    >
                      Users
                    </DashLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Fragment>
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
