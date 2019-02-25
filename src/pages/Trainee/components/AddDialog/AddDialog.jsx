import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Dialog, DialogTitle, DialogContent, DialogContentText, Grid, DialogActions, Button, withStyles, InputAdornment } from '@material-ui/core';
// import * as yup from 'yup';
import PersonIcon from '@material-ui/icons/Person'
import EmailIcon from '@material-ui/icons/Email'

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  }
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
  })
}

handleBlur = field => () => {
  const { touched } = this.state;
  touched[field] = true;
  this.setState({ touched });
}

  handleSubmit = () => {
    // const { name, email, password } = this.state;
    this.props.onSubmit(this.state);
  }

  renderInputField = (field, label, value, inputType, icon) => (
    <TextField
    variant="outlined"
    onBlur={this.handleBlur(field)}
    value={value}
    type={inputType}
    onChange={this.handelChange(field)}
    label={label}
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
                  <Grid item sm={12}>
                    {this.renderInputField('name','Name', name, 'texts',<PersonIcon />)}
                  </Grid>
                  <Grid item sm={12}>
                    {this.renderInputField('email','Email', email, 'texts', <EmailIcon />)}
                  </Grid>
                  <Grid item sm={6}>
                    {this.renderInputField('password','Password', password, 'password')}
                  </Grid>
                  <Grid item sm={6}>
                    {this.renderInputField('confirmPassword','Confirm Password', confirmPassword, 'password')}
                  </Grid>
                </Grid>
              </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">Cancel</Button>
            <Button variant="contained" onClick={this.handleSubmit} color="primary">Submit</Button>
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
