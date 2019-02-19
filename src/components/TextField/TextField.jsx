import React from 'react';
import propTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const { error, ...rest } = props;
  const errorStyle = (error) ? { ...style.error } : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...style.base, ...errorStyle }} />
      {(error) ? <p style={{ color: 'red' }}>{error}</p> : ''}
    </>
  );
};
TextField.propTypes = {
  error: propTypes.string,
};
TextField.defaultProps = {
  error: '',
};
export default TextField;
