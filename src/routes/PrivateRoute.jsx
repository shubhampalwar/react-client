import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { PrivateLayout } from '../layouts';
import { LOGIN } from '../configs/constants';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { component: Comp, ...rest } = this.props;
    return (
      (window.localStorage.getItem('token'))
        ? (
          <>
            <PrivateLayout />
            <div style={{ margin: '5px 20px' }}>
              <Route {...rest} component={Comp} />
            </div>
          </>
        )
        : <Redirect to={LOGIN} />
    );
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
