/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Dialog, DialogTitle, DialogContent, DialogContentText, Grid,
  DialogActions, Button, InputAdornment, withStyles, CircularProgress,
} from '@material-ui/core';
import * as yup from 'yup';
import {
  RemoveRedEye, VisibilityOff, Email, Person,
} from '@material-ui/icons';
import { SnackBarContext } from '../../../../contexts';
import { callApi } from '../../../../lib/utils';


const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    position: 'relative',
  },
  eye: {
    cursor: 'pointer',
  },
  circularProgress: {
    position: 'absolute',
    align: 'center',
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
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'Must contains 8 characters, at least one uppercase letter, one lowercase letter and one number',
    )
    .required()
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
      errors: {},
      touched: {},
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordMasked: { password: true, confirmPassword: true },
      loading: false,
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

  handleBlur = field => () => {
    const { touched } = this.state;
    touched[field] = true;
    this.setState({ touched }, () => this.handleValidate());
  };

  handleValidate = () => {
    const {
      name, email, password, confirmPassword,
    } = this.state;
    validationSchema
      .validate(
        {
          name,
          email,
          password,
          confirmPassword,
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

  handleSubmit = context => async () => {
    try {
      const { name, email, password } = this.state;
      this.setState({ loading: true });
      const result = await callApi({
        method: 'post', url: '/api/trainee', data: { name, email, password }, headers: { Authorization: window.localStorage.getItem('token') },
      });
      if (result) {
        context(result.data.message, 'success');
        this.setState({ loading: false });
        this.props.onSubmit();
      }
    } catch (err) {
      this.setState({ loading: false });
      this.props.onSubmit();
      const msg = (
        <p>
          {err.data.error}
          <br />
          {err.data.message}
        </p>
      );
      context(msg, 'error');
    }
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
      onBlur={this.handleBlur(field)}
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

  handleIcon = (field) => {
    const { classes } = this.props;
    if (this.state.passwordMasked[field]) {
      return <VisibilityOff onClick={this.togglePasswordMask(field)} className={classes.eye} />;
    }
    return <RemoveRedEye onClick={this.togglePasswordMask(field)} className={classes.eye} />;
  }

  togglePasswordMask = field => () => {
    const { passwordMasked } = this.state;
    passwordMasked[field] = !passwordMasked[field];
    this.setState([
      passwordMasked,
    ]);
  }

  render() {
    const { open, onClose, classes } = this.props;
    const {
      name, email, password, confirmPassword, loading,
    } = this.state;
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>ADD TRAINEE</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your trainee details</DialogContentText>
          <Grid className={classes.container} container spacing={24}>
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
            <Grid item xs={6}>
              {this.renderInputField(
                'password',
                'Password',
                password,
                this.state.passwordMasked.password
                  ? 'password'
                  : 'text',
                this.handleIcon('password'),
              )}
            </Grid>
            <Grid item xs={6}>
              {this.renderInputField(
                'confirmPassword',
                'Confirm Password',
                confirmPassword,
                this.state.passwordMasked.confirmPassword
                  ? 'password'
                  : 'text',
                this.handleIcon('confirmPassword'),
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
              Cancel
          </Button>
          <SnackBarContext.Consumer>
            {
              context => (
                <Button
                  variant="contained"
                  onClick={this.handleSubmit(context)}
                  disabled={
                    this.checkState('errors') || !this.checkState('touched') || loading
                  }
                  color="primary"
                >
              Submit
                  {loading && <CircularProgress className={classes.circularProgress} />}
                </Button>
              )
            }
          </SnackBarContext.Consumer>
        </DialogActions>
      </Dialog>
    );
  }
}

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(AddDialog);
