import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import { Edit, Delete } from '@material-ui/icons';
import { AddDialog, EditDialog, RemoveDialog } from './components';
import { Table } from '../../components';
import { callApi, dateFormat } from '../../lib/utils';

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
      id: '',
      orderBy: '',
      order: 'asc',
      page: 0,
      records: [],
      count: 0,
      loader: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  handleAddDialogOpen = () => {
    const { open } = this.state;
    open.addDialog = true;
    this.setState({ open });
  }

  handelTraineeData = () => {
    const { open } = this.state;
    open.addDialog = false;
    this.setState({
      open,
    }, () => this.fetchData());
  }

  handleEditDialogOpen = (values) => {
    const { open } = this.state;
    open.editDialog = true;
    this.setState({
      open,
      id: values.originalId,
      name: values.name,
      email: values.email,
    });
  }

  handleEdit = () => {
    const { open } = this.state;
    open.editDialog = false;
    this.fetchData();
    this.setState({
      open,
    });
  }

  handleRemoveDialogOpen = (values) => {
    const { open } = this.state;
    open.removeDialog = true;
    this.setState({
      open,
      id: values.originalId,
    });
  }

  handleDelete = () => {
    const { open } = this.state;
    this.fetchData();
    open.removeDialog = false;
    this.setState({
      open,
    });
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

  handleSelect = (data) => {
    const { match: { path }, history } = this.props;
    const { _id } = data;
    history.push(`${path}/${_id}`);
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

  handleChangePage = (event, page) => {
    this.setState({
      page,
    }, () => this.fetchData());
  }

  fetchData = async () => {
    try {
      const { page } = this.state;
      this.setState({ loader: true, records: [], count: 0 });
      const result = await callApi({
        method: 'get', url: '/api/trainee', headers: { Authorization: window.localStorage.getItem('token') }, params: { limit: 10, skip: page * 10 },
      });
      if (result.data.data.records.length === 0 && page > 0) {
        this.setState({ page: page - 1 }, () => this.fetchData());
      } else {
        this.setState({
          records: result.data.data.records,
          count: result.data.data.count,
          loader: false,
        });
      }
    } catch (err) {
      throw err;
    }
  }

  render() {
    const {
      open, order, orderBy, name, email, page, records, count, loader, id,
    } = this.state;
    return (
      <>
        <Button style={{ margin: '5px 0px' }} variant="outlined" onClick={this.handleAddDialogOpen} color="primary">ADD TRAINEE LIST </Button>
        <Table
          id="_id"
          data={records}
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
          count={count}
          page={page}
          onChangePage={this.handleChangePage}
          loader={loader}
          dataLength={count}
        />
        {
          open.editDialog && (
            <EditDialog
              open={open.editDialog}
              data={{ name, email, id }}
              onClose={this.handleClose}
              onSubmit={this.handleEdit}
            />
          )
        }
        {
          open.addDialog && (
            <AddDialog
              open={open.addDialog}
              onClose={this.handleClose}
              onSubmit={this.handelTraineeData}
            />
          )
        }
        {
          open.removeDialog && (
            <RemoveDialog
              data={{ id }}
              open={open.removeDialog}
              onClose={this.handleClose}
              onDelete={this.handleDelete}
            />
          )
        }
      </>
    );
  }
}

TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TraineeList;
