/* eslint-disable no-console */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AddDialog } from './components';
import { trainees } from './data';
import { Table } from '../../components';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      email: '',
      password: '',
    };
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  handleClick = () => {
    this.setState({
      open: true,
    });
  }

  handelTraineeData = (values) => {
    this.setState({
      open: false,
      name: values.name,
      email: values.email,
      password: values.password,
    }, () => console.log(this.state));
  }

  renderTrainee = (trainee) => {
    const { match } = this.props;
    const { name, id } = trainee;
    return (
      <li key={id}>
        <Link to={`${match.path}/${id}`}>{name}</Link>
      </li>
    );
  }

  render() {
    const { open } = this.state;
    return (
      <>
        <Button style={{ margin: '5px 0px' }} variant="outlined" onClick={this.handleClick} color="primary">ADD TRAINEE LIST </Button>
        <Table
          id="id"
          data={trainees}
          columns={[
            {
              field: 'name',
              label: 'Name',
              align: 'center',
            },
            {
              field: 'email',
              label: 'Email Address',
            },
          ]}
        />
        <ul>
          {trainees.map(trainee => this.renderTrainee(trainee))}
        </ul>
        <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handelTraineeData} />
      </>
    );
  }
}

TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TraineeList;
