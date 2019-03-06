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
} from '@material-ui/core';

const styles = {
  button: {
    cursor: 'pointer',
  },
};

class RemoveDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.data.name,
      email: props.data.email,
    };
  }

  render() {
    const {
      open, onClose, classes, onDelete,
    } = this.props;
    const { name, email } = this.state;
    return (
      <>
        <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
          <DialogTitle>Remove Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>Do you really want to remove the trainee</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className={classes.button} onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => onDelete({ name, email })}
              color="primary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
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
