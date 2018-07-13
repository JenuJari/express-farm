import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Form,
    Button,
    FormGroup,
    ControlLabel,
    FormControl
} from "react-bootstrap";
import * as services from "./../../store/services";
import { Redirect } from "react-router-dom";

class Page extends Component {
    static displayName = "RegisterPage";

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor() {
        super();

        this.state = {
            name: "",
            email: "",
            password: ""
        };

        this.submitRegister = this.submitRegister.bind(this);
    }

    submitRegister() {
        this.props.dispatch(services.authService.register(this.state));
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/dashbord" />;
        }

        return (
            <div style={{ margin: "75px" }}>
                <div className="row">
                    <div className="mx-auto">
                        <Form>
                            <FormGroup controlId="txtName" validationState={null}>
                                <ControlLabel>Name</ControlLabel>
                                <FormControl type="text" placeholder="Enter your name"
                                    value={this.state.name} onChange={e => {this.setState({ name: e.target.value }); }}
                                    name="name"/>
                            </FormGroup>
                            <FormGroup controlId="txtEmail" validationState={null}>
                                <ControlLabel>Email</ControlLabel>
                                <FormControl type="email" placeholder="Enter your email"
                                    value={this.state.email} onChange={e => {this.setState({ email: e.target.value }); }}
                                    name="email"/>
                            </FormGroup>
                            <FormGroup controlId="txtPassword" validationState={null}>
                                <ControlLabel>Password</ControlLabel>
                                <FormControl type="password" placeholder="Enter your password"
                                    value={this.state.password} onChange={e => {this.setState({ password: e.target.value }); }}
                                    name="password" />
                            </FormGroup>
                            <Button onClick={this.submitRegister}>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Page;
