import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthLayout } from '../layouts';
import { TRAINEE } from '../configs/constants';

class AuthRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { component: Comp, ...rest } = this.props;
    return (
      (window.localStorage.getItem('token'))
        ? <Redirect to={TRAINEE} />
        : (
          <>
            <Route {...rest} component={Comp} />
            <AuthLayout />
          </>
        )
    );
  }
}

AuthRoutes.propTypes = {
  component: PropTypes.func.isRequired,
};

export default AuthRoutes;
