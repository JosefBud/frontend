import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Container, Row, Col, Table } from 'react-bootstrap';

export default class UserRecipes extends Component {
  listRecipes() {}
  render() {
    const listItems = [];

    for (let i = 0; i < 20; i++) {
      listItems.push(
        <tr key={i}>
          <td>
            <Link to="#">Recipe {i}</Link>
          </td>
        </tr>
      );
    }

    return (
      <Container className="text-center">
        <Row>
          <Col>
            <h1>Your Original Recipes</h1>
            <Table striped bordered>
              <tbody>{listItems}</tbody>
            </Table>
          </Col>
          <Col>
            <h1>Your Adapted Recipes</h1>
            <Table striped bordered>
              <tbody>{listItems}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}
