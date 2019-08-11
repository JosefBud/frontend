import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';
import { Layout } from '.';

import { actions as dashboardActions } from 'reducers/dashboard';
import { getMigrations } from 'selectors/dashboard';

export class Migrations extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    opt: PropTypes.object.isRequired,
    migrations: PropTypes.array
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.requestMigrations();
  }

  render() {
    const { migrations, opt } = this.props;

    return (
      <Layout
        pageTitle="Database Migrations - Dashboard"
        header="Database &gt; Migrations"
        options={opt}
      >
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Ran</th>
              <th>MD5</th>
            </tr>
          </thead>
          <tbody>
            {migrations.map((migration, index) => {
              if (index === 0) {
                return;
              }
              return (
                <tr key={index}>
                  <td>{migration.version}</td>
                  <td>{migration.name}</td>
                  <td>{migration.runAt}</td>
                  <td>{migration.md5}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  migrations: getMigrations(state)
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
)(Migrations);
