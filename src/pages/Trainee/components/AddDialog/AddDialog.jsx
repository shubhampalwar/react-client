import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Dialog, DialogTitle, DialogContent, DialogContentText, Grid, DialogActions, Button, InputAdornment, withStyles } from '@material-ui/core';
import * as yup from 'yup';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  }
})

const validationSchema = yup.object({
  name: yup.string().min(3).required().label('Name'),
  email: yup.string().email().required().label('Email'),
  password: yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,'Must contains 8 characters, at least one uppercase letter, one lowercase letter and one number')
  .required().label('Password'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Must match password')
  .required().label('Confirm Password'),
})

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
    };
  }

handelChange = field => (event) => {
  this.setState({
    [field]: event.target.value,
  },
  () => this.handleValidate());
}

handleBlur = field => () => {
  const { touched } = this.state;
  touched[field] = true;
  this.setState({ touched },() => this.handleValidate());
}

handleValidate = () => {
  const {
    name, email, password, confirmPassword
  } = this.state;
  validationSchema.validate({
    name,email, password, confirmPassword
  }, { abortEarly: false }).then(() => {
    this.handleError(null);
  }).catch((errors) => {
    this.handleError(errors);
  });
}
  handleSubmit = () => {
    // const { name, email, password } = this.state;
    this.props.onSubmit(this.state);
  }

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
  }

  getErrors = (field) => {
    const { touched, errors } = this.state;
    if (!touched[field] ) {
      return null;
    }
    return errors[field] || '';
  }

  checkState = (field) => (Object.keys(this.state[field]).length !== 0)

  renderInputField = (field, label, value, inputType, icon) => (
    <TextField
    variant="outlined"
    onBlur={this.handleBlur(field)}
    value={value}
    type={inputType}
    onChange={this.handelChange(field)}
    label={label}
    helperText={this.getErrors(field)}
    InputProps={{startAdornment: (
      <InputAdornment position="start" >
        {icon}
      </InputAdornment>
    ),
  }}
    />
  )
  render() {
    const { open, onClose, classes } = this.props;
    const { name, email, password, confirmPassword } = this.state;
    return (
      <>
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
          <DialogTitle>ADD TRAINEE</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter your trainee details</DialogContentText>
              <div className={classes.container}>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    {this.renderInputField('name','Name', name, 'texts',<PersonIcon />)}
                  </Grid>
                  <Grid item xs={12}>
                    {this.renderInputField('email','Email', email, 'texts', <EmailIcon />)}
                  </Grid>
                  <Grid item xs={6}>
                    {this.renderInputField('password','Password', password, 'password', <VisibilityOffIcon />)}
                  </Grid>
                  <Grid item xs={6}>
                    {this.renderInputField('confirmPassword','Confirm Password', confirmPassword, 'password',<VisibilityOffIcon />)}
                  </Grid>
                </Grid>
              </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">Cancel</Button>
            <Button variant="contained" onClick={this.handleSubmit} disabled={this.checkState('errors') || !this.checkState('touched')} color="primary">Submit</Button>
          </DialogActions>
        </Dialog>
      </>
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
