import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { PrivateLayout } from '../layouts';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { component: Comp, ...rest } = this.props;
    return (
      <>
        <PrivateLayout />
        <Route {...rest} component={Comp} />
      </>
    );
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
};

export default PrivateRoute;
