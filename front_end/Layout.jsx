import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row,Col} from 'react-bootstrap';

export default class Layout extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    }

    render() {
        return (
            <div className="container">
              <div className="header clearfix">
                <nav>
                  <ul className="nav nav-pills pull-right">
                    <li role="presentation" className="active"><a href="#">Home</a></li>
                    <li role="presentation"><a href="#">About</a></li>
                    <li role="presentation"><a href="#">Contact</a></li>
                  </ul>
                </nav>
                <h3 className="text-muted">Project name</h3>
              </div>

              <Row className="marketing">
                <Col xs={12}>
                    {this.props.children}
                </Col>
              </Row>

              <footer className="footer">
                <p>&copy; 2016 Company, Inc.</p>
              </footer>

            </div>
        );
    }
}
