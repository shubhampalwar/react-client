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
        <Route {...rest} component={Comp} />
        <AuthLayout />
      </>
    );
  }
}

AuthRoutes.propTypes = {
  component: PropTypes.func.isRequired,
};

export default AuthRoutes;
