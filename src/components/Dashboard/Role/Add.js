import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Form } from 'react-bootstrap';
import DashLink from 'components/Dashboard/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { actions as rolesActions } from 'reducers/roles';
import { actions as dashActions } from 'reducers/dashboard';

export class RoleAdd extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ name }) {
    const { actions } = this.props;

    actions.addRole({ name });
    actions.selectDashboard({ name: 'Roles' });
  }

  render() {
    return (
      <Fragment>
        <Helmet title="Add Role - Dashboard" />
        <h2>Roles &gt; Add Role</h2>
        <FontAwesomeIcon icon={faChevronLeft} /> &nbsp;
        <DashLink to="#roles" name="Roles">
          <span>Back</span>
        </DashLink>
        <FinalForm
          onSubmit={this.handleSubmit}
          render={({ handleSubmit, submitting }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Field name="name" required="true">
                {({ input, meta }) => (
                  <Form.Group>
                    <Form.Label>Role Name</Form.Label>
                    <Form.Control
                      {...input}
                      type="text"
                      placeholder="role name"
                      isInvalid={meta.error}
                    />
                    {meta.error && (
                      <Form.Control.Feedback type="invalid">
                        {meta.error === 'required'
                          ? 'This field is required'
                          : ''}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                )}
              </Field>
              <Button
                className="button-animation"
                variant="primary"
                type="submit"
                disabled={submitting}
              >
                <span>Save</span>
              </Button>
            </Form>
          )}
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...rolesActions,
      ...dashActions
    },
    dispatch
  )
});

export default connect(
  null,
  mapDispatchToProps
)(RoleAdd);
