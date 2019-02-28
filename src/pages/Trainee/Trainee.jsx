/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import TraineeDetails from './TraineeDetails';
import TraineeList from './TraineeList';

class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={`${match.path}`} component={TraineeList} />
        <Route exact path={`${match.path}/:id`} component={TraineeDetails} />
      </Switch>
    );
  }
}

Trainee.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Trainee;
