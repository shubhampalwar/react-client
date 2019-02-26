import React, { Component } from 'react';
import {
  withStyles, CssBaseline, Paper, Avatar, Typography, FormControl, TextField, InputAdornment,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

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
      autoFocus={(field === 'email')}
      autoComplete={field}
    />
  );

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
            <form className={classes.form}>
              <FormControl required fullWidth>
                {this.renderInputField(
                  'email',
                  'Email',
                  email,
                  'texts',
                  <EmailIcon />,
                )}
              </FormControl>
              <FormControl required fullWidth>
                {this.renderInputField(
                  'password',
                  'Password',
                  password,
                  'password',
                  <VisibilityOffIcon />,
                )}
              </FormControl>
            </form>
          </Paper>
        </main>
      </>
    );
  }
}

Login.prototypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
