import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { AuthLayout } from '../layouts';

class AuthRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { component: Comp, ...rest } = this.props;
    return (
      <>
        <h1>AuthRoutes</h1>
        <AuthLayout />
        <Route {...rest} component={Comp} />
      </>
    );
  }
}

AuthRoutes.propTypes = {
  component: PropTypes.element.isRequired,
};

export default AuthRoutes;
