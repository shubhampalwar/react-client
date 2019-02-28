import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = {
  heading: {
    fontFamily: 'sans-serif',
    fontWeight: '100',
    textAlign: 'center',
    fontSize: '50px',
  },
  notfoundContent: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    color: 'grey',
  },
};

class NoMatch extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <h1 className={classes.heading}>Not Found</h1>
        <p className={classes.notfoundContent}>
        Seems like the page you are looking after does not exist.
        </p>
      </>
    );
  }
}

NoMatch.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(NoMatch);
