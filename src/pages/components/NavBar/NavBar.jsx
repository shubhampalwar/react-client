import React, { Component } from 'react';
import {
  AppBar, Button, Toolbar, Typography, withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
  toolbarTitle: {
    flex: 1,
  },
  appBar: {
    position: 'relative',
  },
  link: {
    color: 'white',
  },
  menuList: {
    marginRight: theme.spacing.unit * 2,
  },
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <AppBar className={classes.AppBar} color="primary" position="static">
          <Toolbar>
            <Typography className={classes.toolbarTitle} variant="h6" color="inherit" noWrap>Trainee Portal</Typography>
            <div className={classes.menuList}>
              <Button className={classes.link} color="default" variant="text">TRAINEE</Button>
              <Button className={classes.link} color="default" variant="text">TEXTFIELD DEMO</Button>
              <Button className={classes.link} color="default" variant="text">INPUT DEMO</Button>
              <Button className={classes.link} color="default" variant="text">CHILDREN DEMO</Button>
            </div>
            <Button className={classes.link} color="default" variant="text">LOGOUT</Button>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

NavBar.prototypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NavBar);
