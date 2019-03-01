import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Table, TableHead, TableRow, TableCell, TableBody,
} from '@material-ui/core';

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTable = (columns, data) => (
    data.map((trainee) => {
      const { id } = trainee;
      return (
        <TableRow key={id}>
          {
            columns.map((column) => {
              const { align, field } = column;
              return (
                <TableCell align={align} key={`${id}${field}`}>{trainee[field]}</TableCell>
              );
            })
          }
        </TableRow>
      );
    })
  )

  render() {
    const { id, data, columns } = this.props;
    return (
      <Paper>
        <Table id={id}>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell align={column.align} key={column.field}>
                  { (!column.label) ? column.field : column.label }
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.renderTable(columns, data)
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

TableComponent.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableComponent;
