import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import Layout from './../Layout'

const PublicRoutes = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => (
    <Layout>
      <Component {...props}/>
    </Layout>
  )}/>
}

PublicRoutes.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default PublicRoutes
