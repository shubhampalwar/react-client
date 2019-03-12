/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { CircularProgress, withStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = {
  circularProgress: {
    position: 'absolute',
    top: 200,
    left: '47%',
  },
  message: {
    textAlign: 'center',
  },
};


export default (WrappedComponent) => {
  const HOC = ({
    loader, dataLength, classes, ...props
  }) => (
    <>
      {loader && <CircularProgress size={100} className={classes.circularProgress} />}
      {dataLength === 0 && !loader && <Typography component="h2" variant="display1" className={classes.message} gutterBottom>OOPs no data was found :&#40; </Typography> }
      { (dataLength !== 0) && <WrappedComponent {...props} />}
    </>
  );
  HOC.propTypes = {
    loader: PropTypes.bool.isRequired,
    dataLength: PropTypes.number.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  };
  return withStyles(styles)(HOC);
};
