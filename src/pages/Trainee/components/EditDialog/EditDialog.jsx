/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  DialogActions,
  Button,
  InputAdornment,
  withStyles,
} from '@material-ui/core';
import * as yup from 'yup';
import { Email, Person } from '@material-ui/icons';

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    width: '100%',
  },
});

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3)
    .required()
    .label('Name'),
  email: yup
    .string()
    .email()
    .required()
    .label('Email'),
});

class EditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      touched: {},
      name: props.data.name,
      email: props.data.email,
    };
  }

  handelChange = field => (event) => {
    const { touched } = this.state;
    touched[field] = true;
    this.setState(
      {
        [field]: event.target.value,
        touched,
      },
      () => this.handleValidate(),
    );
  };

  handleValidate = () => {
    const { name, email } = this.state;
    validationSchema
      .validate(
        {
          name,
          email,
        },
        { abortEarly: false },
      )
      .then(() => {
        this.handleError(null);
      })
      .catch((errors) => {
        this.handleError(errors);
      });
  };

  handleError = (errors) => {
    const allErrors = {};
    if (errors) {
      errors.inner.forEach((error) => {
        allErrors[error.path] = error.message;
      });
    }
    this.setState({
      errors: allErrors,
    });
  };

  getErrors = (field) => {
    const { touched, errors } = this.state;
    if (touched[field]) {
      return errors[field] || '';
    }
    return null;
  };

  checkState = field => Object.keys(this.state[field]).length !== 0;

  renderInputField = (field, label, value, inputType, icon) => (
    <TextField
      variant="outlined"
      value={value}
      type={inputType}
      onChange={this.handelChange(field)}
      label={label}
      helperText={this.getErrors(field)}
      InputProps={{
        startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
      }}
      fullWidth
      error={!!this.getErrors(field)}
    />
  );

  render() {
    const {
      open, onClose, classes, onSubmit,
    } = this.props;
    const { name, email } = this.state;
    return (
      <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
        <DialogTitle>Edit Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your trainee details</DialogContentText>
          <div className={classes.container}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                {this.renderInputField(
                  'name',
                  'Name',
                  name,
                  'texts',
                  <Person />,
                )}
              </Grid>
              <Grid item xs={12}>
                {this.renderInputField(
                  'email',
                  'Email',
                  email,
                  'texts',
                  <Email />,
                )}
              </Grid>

            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
              Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => onSubmit({ name, email })}
            disabled={
              this.checkState('errors') || !this.checkState('touched')
            }
            color="primary"
          >
              Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.string),
};

EditDialog.defaultProps = {
  data: {},
};
export default withStyles(styles)(EditDialog);
