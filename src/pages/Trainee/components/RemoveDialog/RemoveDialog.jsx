/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  withStyles,
  CircularProgress,
} from '@material-ui/core';
import { SnackBarContext } from '../../../../contexts';
import { callApi } from '../../../../lib/utils';

const styles = {
  button: {
    cursor: 'pointer',
  },
  circularProgress: {
    position: 'absolute',
    align: 'center',
  },
};

class RemoveDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  handleDelete = context => async () => {
    try {
      const { data: { id } } = this.props;
      this.setState({ loading: true });
      const result = await callApi({
        method: 'delete', url: `/api/trainee/${id}`, headers: { Authorization: window.localStorage.getItem('token') },
      });
      if (result) {
        context(result.data.message, 'success');
        this.props.onDelete();
      }
    } catch (error) {
      context(error.data.error, 'success');
      this.props.onClose();
    }
  }

  render() {
    const { open, onClose, classes } = this.props;
    const { loading } = this.state;
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Remove Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you really want to remove the trainee</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={classes.button} onClick={onClose} color="primary">
              Cancel
          </Button>
          <SnackBarContext.Consumer>
            {
              context => (
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={this.handleDelete(context)}
                  color="primary"
                  disabled={loading}
                >
              Delete
                  { loading && <CircularProgress className={classes.circularProgress} />}
                </Button>
              )
            }
          </SnackBarContext.Consumer>
        </DialogActions>
      </Dialog>
    );
  }
}

RemoveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  onDelete: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(RemoveDialog);
