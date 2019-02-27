import React, { Component } from 'react';
import { NavBar } from '../components';
// import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';

class PrivateLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar />
      </>
    );
  }
}

export default PrivateLayout;
