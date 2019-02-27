import React, { Component } from 'react';
import {
  AppBar, Button, Toolbar, Typography, withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const styles = theme => ({
  toolbarTitle: {
    flex: 1,
  },
  appBar: {
    position: 'relative',
    margin: theme.spacing.unit * 10,
  },
  link: {
    color: 'white',
    fontSize: 'inherit',
    textDecoration: 'none',
    padding: theme.spacing.unit * 1,
    fontFamily: ['"Comic Sans MS"', 'cursive', 'sans-serif'].join(' ,'),
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
              <Link to="/trainee" className={classes.link} color="default" variant="text">TRAINEE</Link>
              <Link to="/text-field-demo" className={classes.link} color="default" variant="text">TEXTFIELD DEMO</Link>
              <Link to="/input-demo" className={classes.link} color="default" variant="text">INPUT DEMO</Link>
              <Link to="/children-demo" className={classes.link} color="default" variant="text">CHILDREN DEMO</Link>
            </div>
            <Button className={classes.link} color="default" variant="text">LOGOUT</Button>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(NavBar);
