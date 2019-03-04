/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Table, TableHead, TableRow, TableCell, TableBody, withStyles, TableSortLabel,
} from '@material-ui/core';

const styles = theme => ({
  tableRow: {
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey[100],
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
    },
  },
  tableHeader: {
    cursor: 'pointer',
  },
});

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSelect = data => () => {
    this.props.onSelect(data);
  }

  handleSort = field => () => {
    this.props.onSort(field);
  }

  renderTable = (columns, data, id) => (
    data.map((trainee) => {
      const { classes } = this.props;
      return (
        <TableRow
          onClick={this.handleSelect(trainee)}
          className={classes.tableRow}
          key={trainee[id]}
        >
          {
            columns.map((column) => {
              const { align, field, format } = column;
              return (
                <TableCell align={align} key={`${trainee[id]}${field}`}>{(format) ? format(trainee[field]) : trainee[field]}</TableCell>
              );
            })
          }
        </TableRow>
      );
    })
  )

  render() {
    const {
      id, data, columns, classes, orderBy, order,
    } = this.props;
    return (
      <Paper>
        <Table id={id}>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                const { field, label, align } = column;
                return (
                  <TableCell
                    className={classes.tableHeader}
                    onClick={this.handleSort(field)}
                    align={align}
                    key={field}
                  >
                    { (!label) ? field : label }
                    <TableSortLabel direction={order} active={orderBy === field} />
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.renderTable(columns, data, id)
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
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onSort: PropTypes.func,
  onSelect: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

TableComponent.defaultProps = {
  order: '',
  orderBy: '',
  onSelect: () => {},
  onSort: () => {},
};

export default withStyles(styles)(TableComponent);
