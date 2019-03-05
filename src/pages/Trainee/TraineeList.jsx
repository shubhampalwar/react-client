/* eslint-disable no-console */
import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import { Edit, Delete } from '@material-ui/icons';
import { AddDialog, EditDialog, RemoveDialog } from './components';
import { trainees } from './data';
import { Table } from '../../components';
import dateFormat from '../../lib/utils/dateFormat';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: {
        addDialog: false,
        editDialog: false,
        removeDialog: false,
      },
      name: '',
      email: '',
      password: '',
      orderBy: '',
      order: 'asc',
    };
  }

  handleClose = () => {
    const { open } = this.state;
    open.addDialog = false;
    open.editDialog = false;
    open.removeDialog = false;
    this.setState({
      open,
    });
  }

  handleClick = () => {
    const { open } = this.state;
    open.addDialog = true;
    this.setState({
      open,
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

  handleEditDialogOpen = (values) => {
    const { open } = this.state;
    // console.log('====', values);
    open.editDialog = true;
    // data.name = values.name;
    // data.email = values.email;
    this.setState({
      open,
      name: values.name,
      email: values.email,
    });
  }

  handleRemoveDialogOpen = (values) => {
    const { open } = this.state;
    // console.log('====', values);
    open.removeDialog = true;
    this.setState({
      open,
      name: values.name,
      email: values.email,
    });
  }

  handelTraineeData = (values) => {
    const { open } = this.state;
    open.addDialog = false;
    open.removeDialog = false;
    this.setState({
      open,
      name: values.name,
      email: values.email,
      password: values.password,
    }, () => console.log(this.state));
  }

  handleDelete = (values) => {
    const { open } = this.state;
    console.log(values);
    open.removeDialog = false;
    open.editDialog = false;
    this.setState({
      open,
    });
  }

  render() {
    const {
      open, order, orderBy, name: stateName, email: stateEmail,
    } = this.state;
    const data = {
      name: stateName,
      email: stateEmail,
    };
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
          actions={[
            {
              icon: <Edit />,
              handler: this.handleEditDialogOpen,
            },
            {
              icon: <Delete />,
              handler: this.handleRemoveDialogOpen,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={100}
          // page={page}
          // onChangePage={this.handleChangePage}
        />
        <EditDialog
          open={open.editDialog}
          data={data}
          onClose={this.handleClose}
          onSubmit={this.handleDelete}
        />
        <AddDialog
          open={open.addDialog}
          onClose={this.handleClose}
          onSubmit={this.handelTraineeData}
        />
        <RemoveDialog
          data={data}
          open={open.removeDialog}
          onClose={this.handleClose}
          onDelete={this.handleDelete}
        />
      </>
    );
  }
}

TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TraineeList;
