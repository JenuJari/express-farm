import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Page extends Component {

    static displayName = "LoginPage";

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
        user : PropTypes.object
    };

    constructor() {
        super();
    }

    render() {
        console.log('render dashbord', typeof this.props.user);

        return (<div>
            <h1>
                Dash bord
            </h1>
            <pre>
                {
                    typeof this.props.user != 'undefined' ? JSON.stringify(this.props.user) : 'N'
                }
            </pre>
        </div>);
    }

}

export default Page;
