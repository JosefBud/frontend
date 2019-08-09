import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
// import ComponentSelector from 'components/Dashboard/ComponentSelector';
import DashLink from 'components/Dashboard/Link';
import DashMain from 'components/Dashboard/Main';
import { Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBezierCurve,
  faClock,
  faDatabase,
  faEyeDropper,
  faUsers,
  faUsersCog,
  faUserShield,
  faTachometerAlt
} from '@fortawesome/free-solid-svg-icons';

import { actions as dashboardActions } from 'reducers/dashboard';
import { getDashboardComponent } from 'selectors/dashboard';

export class Dashboard extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row className="text-center">
          <Col>
            <h1>Dashboard</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={3}>
            <Accordion>
              <Card>
                <Card.Body>
                  <FontAwesomeIcon icon={faTachometerAlt} /> &nbsp;
                  <DashLink to="#home" name="Home">
                    Dashboard
                  </DashLink>
                </Card.Body>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <h3>
                    <FontAwesomeIcon icon={faUsers} /> Users
                  </h3>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <div>
                      <FontAwesomeIcon icon={faUsersCog} /> &nbsp;
                      <DashLink to="#users" name="Users">
                        Users
                      </DashLink>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faUserShield} /> &nbsp;
                      <DashLink to="#roles" name="Roles">
                        Roles
                      </DashLink>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  <h3>
                    <FontAwesomeIcon icon={faBezierCurve} /> Ingredients
                  </h3>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <div>
                      <FontAwesomeIcon icon={faEyeDropper} /> &nbsp;
                      <DashLink to="#flavors" name="Flavors">
                        Flavors
                      </DashLink>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  <h3>
                    <FontAwesomeIcon icon={faDatabase} /> Database
                  </h3>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <FontAwesomeIcon icon={faClock} /> &nbsp;
                    <DashLink to="#migrations" name="Migrations">
                      Migration History
                    </DashLink>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
          <Col xs={12} md={9}>
            <DashMain />
          </Col>
        </Row>
      </Container>
    );
  }
}

// export default Dashboard;

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
)(Dashboard);
