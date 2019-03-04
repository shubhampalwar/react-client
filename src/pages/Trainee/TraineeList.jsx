/* eslint-disable no-console */
import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { AddDialog } from './components';
import { trainees } from './data';
import { Table } from '../../components';
import dateFormat from '../../lib/utils/dateFormat';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      email: '',
      password: '',
      orderBy: '',
      order: 'asc',
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

  handleSelect = (data) => {
    const { match: { path }, history } = this.props;
    const { id } = data;
    history.push(`${path}/${id}`);
  }

  handleSort = (field) => {
    const { order, orderBy } = this.state;
    let sortOrder = 'asc';
    if (order === 'asc' && orderBy === field) {
      sortOrder = 'desc';
    }
    this.setState({
      orderBy: field,
      order: sortOrder,
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

  render() {
    const { open, order, orderBy } = this.state;
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
              format: value => value && value.toUpperCase(),
            },
            {
              field: 'createdAt',
              label: 'Date',
              align: 'right',
              format: value => dateFormat(value),
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
        />
        <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handelTraineeData} />
      </>
    );
  }
}

TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TraineeList;
