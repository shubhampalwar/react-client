import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { error, ...rest } = this.props;
    const errorStyle = error ? { ...style.error } : {};
    return (
      <>
        <input type="text" {...rest} style={{ ...style.base, ...errorStyle }} />
        {error ? <p style={{ color: 'red' }}>{error}</p> : ''}
      </>
    );
  }
}

TextField.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
TextField.defaultProps = {
  error: '',
};
export default TextField;
