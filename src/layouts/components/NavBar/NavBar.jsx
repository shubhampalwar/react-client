import React, { Component } from 'react';
import {
  AppBar, Toolbar, Typography, withStyles, CssBaseline, Button,
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  CHILDREN_DEMO, TRAINEE, LOGIN, INPUT_DEMO, TEXT_FIELD_DEMO,
} from '../../../configs/constants';

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

  handleLogOut = () => {
    const { history } = this.props;
    window.localStorage.removeItem('token');
    history.push(LOGIN);
  }

  render() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.AppBar} color="primary" position="static">
        <CssBaseline />
        <Toolbar>
          <Typography className={classes.toolbarTitle} variant="h6" color="inherit" noWrap>Trainee Portal</Typography>
          <div className={classes.menuList}>
            <Link to={TRAINEE} className={classes.link} color="default" variant="text">TRAINEE</Link>
            <Link to={TEXT_FIELD_DEMO} className={classes.link} color="default" variant="text">TEXTFIELD DEMO</Link>
            <Link to={INPUT_DEMO} className={classes.link} color="default" variant="text">INPUT DEMO</Link>
            <Link to={CHILDREN_DEMO} className={classes.link} color="default" variant="text">CHILDREN DEMO</Link>
          </div>
          <Button onClick={this.handleLogOut} className={classes.link} color="default" variant="text">LOGOUT</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default withRouter(withStyles(styles)(NavBar));
