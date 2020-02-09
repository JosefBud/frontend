import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Form } from 'react-bootstrap';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { actions as flavorsActions } from 'reducers/flavors';
import { actions as dashActions } from 'reducers/dashboard';

export class FlavorEdit extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    layoutOptions: PropTypes.object.isRequired,
    flavorId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ name }) {
    const { actions, flavorId } = this.props;

    actions.updateFlavor({ flavorId, name });
    actions.selectDashboard({ name: 'Flavors' });
  }

  render() {
    const { name, layoutOptions } = this.props;

    return (
      <Layout
        pageTitle="Edit Flavor - Dashboard"
        header={`Flavors > Edit Flavor > ${name}`}
        options={layoutOptions}
      >
        <FontAwesomeIcon icon="chevron-left" /> &nbsp;
        <DashLink to="#flavors" name="Flavors">
          <span>Back</span>
        </DashLink>
        <FinalForm
          onSubmit={this.handleSubmit}
          render={({ handleSubmit, submitting }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Field name="name" required="true">
                {({ input, meta }) => (
                  <Form.Group>
                    <Form.Label>Flavor Name</Form.Label>
                    <Form.Control
                      {...input}
                      type="text"
                      placeholder={name}
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
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...flavorsActions,
      ...dashActions
    },
    dispatch
  )
});

export default connect(
  null,
  mapDispatchToProps
)(FlavorEdit);
