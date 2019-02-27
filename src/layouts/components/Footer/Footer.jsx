import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  footer: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 4,
  }
})
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.footer}>&copy; Successive Softwares</div>
      </>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Footer);
