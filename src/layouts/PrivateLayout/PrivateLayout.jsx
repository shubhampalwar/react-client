import React, { Component } from 'react';
import { NavBar } from '../components';

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
