/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  TextField,
  Button,
  InputAdornment,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { VisibilityOffIcon } from '@material-ui/icons/VisibilityOff';
import { PersonIcon } from '@material-ui/icons/Person';
import { EmailIcon } from '@material-ui/icons/Email';
import * as yup from 'yup';

const style = theme => ({
  container: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
});

const traineeSchema = yup.object({
  name: yup
    .string()
    .min(3)
    .required()
    .label('name'),
  email: yup
    .string()
    .email()
    .required()
    .label('email'),
  password: yup
    .string()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/,
      'Must contains 8 characters, at least one uppercase letter,one lowercase letter and one number').required()
    .label('Password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Must match password')
    .required()
    .label('Confirm Password'),
});

class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      touched: {},
      errors: {},
    };
  }

  handleChange = field => (event) => {
    this.setState(
      {
        [field]: event.target.value,
      },
      () => this.handleValidate(),
    );
  };

  handleBlur = field => () => {
    const { touched } = this.state;
    touched[field] = true;
    this.setState({ touched }, () => this.handleValidate());
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

  handleValidate = () => {
    const { name, email } = this.state;
    traineeSchema
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

  getErrors = (field) => {
    const { touched, errors } = this.state;
    if (!touched[field]) {
      return null;
    }
    return errors[field] || '';
  };

  checkState = field => Object.keys(this.state[field]).length !== 0;

  handleSubmit = () => {
    const { name, email, password } = this.state;
    const { onSubmit } = this.props;
    onSubmit({ name, email, password });
  }


  renderInputField = (field, label, value, inputType, icon) => (
    <TextField
      variant="outlined"
      label={label}
      value={value}
      onChange={this.handleChange(field)}
      onBlur={this.handleBlur(field)}
      helperText={this.getErrors(field)}
      type={inputType}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ),
      }}
    />
  )

  render() {
    console.log('hello');
    const {
      name, email, password, confirmPassword,
    } = this.state;
    return (
      <>
        <Dialog {...this.props}>
          <DialogTitle>Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter your trainee details</DialogContentText>
            <div>
              <Grid container spacing={24}>
                <Grid item sm={12}>
                  {this.renderInputField('name', 'Name', name, 'text', <PersonIcon />)}
                </Grid>
                <Grid item sm={12}>
                  {this.renderInputField('email', 'Email', email, 'text', <EmailIcon />)}
                </Grid>
                <Grid item sm={6}>
                  {this.renderInputField('password', 'Password', password, 'password', <VisibilityOffIcon />)}
                </Grid>
                <Grid item sm={6}>
                  {this.renderInputField('confirmPassword', 'Confirm Password', confirmPassword, 'password', <VisibilityOffIcon />)}
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">Cancel</Button>
            <Button onClick={this.handleSubmit} variant="contained" disabled={this.checkState('errors') || !this.checkState('touched')}>Submit</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

AddDialog.prototype = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(style)(AddDialog);
