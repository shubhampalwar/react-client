/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  withStyles,
  TableSortLabel,
  Button,
  TablePagination,
} from '@material-ui/core';
import { withLoaderAndMessage } from '../HOC';

const styles = theme => ({
  tableRow: {
    cursor: 'pointer',
    height: 70,
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey[100],
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:first-child': {
      borderTop: `1px solid ${theme.palette.grey[300]}`,
    },
  },
  tableHeader: {
    cursor: 'pointer',
  },
  actionIcons: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTable = (columns, data, id, actions) => data.map((trainee) => {
    const { classes } = this.props;
    return (
      <TableRow key={trainee[id]} className={classes.tableRow}>
        {columns.map((column) => {
          const { align, field, format } = column;
          return (
            <TableCell
              align={align}
              onClick={() => this.props.onSelect(trainee)}
              key={`${trainee[id]}${field}`}
            >
              {format ? format(trainee[field]) : trainee[field]}
            </TableCell>
          );
        })}
        {!actions ? null : (
          <TableCell align="center">
            <div className={classes.actionIcons}>
              {actions.map(action => (
                <Button
                  key={`${trainee[id]}.${Math.random()}`}
                  onClick={() => action.handler(trainee)}
                >
                  {action.icon}
                </Button>
              ))}
            </div>
          </TableCell>
        )}
      </TableRow>
    );
  });

  render() {
    const {
      id, data, columns, classes, orderBy, order, onChangePage,
      page, actions, count, rowsPerPage, onSort,
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
                    onClick={() => onSort(field)}
                    align={align}
                    key={field}
                  >
                    { label || field }
                    <TableSortLabel
                      direction={order}
                      active={orderBy === field}
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>{this.renderTable(columns, data, id, actions)}</TableBody>
          {
            (count === 0)
              ? null
              : (
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[]}
                      count={count}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                      nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                      onChangePage={onChangePage}
                    />
                  </TableRow>
                </TableFooter>
              )
          }
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
  actions: PropTypes.arrayOf(PropTypes.object),
  count: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onChangePage: PropTypes.func,
};

TableComponent.defaultProps = {
  order: '',
  orderBy: '',
  onSelect: () => {},
  onSort: () => {},
  actions: null,
  count: 0,
  page: 1,
  rowsPerPage: 10,
  onChangePage: () => {},
};

export default withStyles(styles)(withLoaderAndMessage(TableComponent));
