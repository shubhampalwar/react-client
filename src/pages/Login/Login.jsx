/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  withStyles, Button, CssBaseline, Paper, Avatar, Typography, TextField, InputAdornment, Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Email, VisibilityOff, RemoveRedEye } from '@material-ui/icons';
import * as yup from 'yup';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    // width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 2,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  eye: {
    cursor: 'pointer',
  },
});

const validationSchema = yup.object({
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().label('Password'),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      touched: {},
      confirmPassword: '',
      passwordMasked: { password: true, confirmPassword: true },
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

  handleSubmit = () => {
    const { email, password } = this.state;
    this.setState({
      email: '',
      password: '',
      touched: {},
      confirmPassword: '',
      passwordMasked: { password: true, confirmPassword: true },
    });
    console.log({ email, password });
  }

  handleBlur = field => () => {
    const { touched } = this.state;
    touched[field] = true;
    this.setState({ touched }, () => this.handleValidate());
  };

  handleValidate = () => {
    const { email, password } = this.state;
    validationSchema
      .validate({ email, password }, { abortEarly: false })
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
    const { errors, touched } = this.state;
    if (!touched[field]) { return null; }
    return errors[field] || '';
  }

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
    const { classes } = this.props;
    const { email, password } = this.state;
    return (
      <>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Login</Typography>
            <Grid container spacing={24} className={classes.form}>
              <Grid item xs={12}>
                {this.renderInputField(
                  'email',
                  'Email',
                  email,
                  'texts',
                  <Email />,
                )}
              </Grid>
              <Grid item xs={12}>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={this.checkState('errors') || !this.checkState('touched')}
                className={classes.submit}
                onClick={this.handleSubmit}
              >
            Sign in
              </Button>
            </Grid>
          </Paper>
        </main>
      </>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Login);
