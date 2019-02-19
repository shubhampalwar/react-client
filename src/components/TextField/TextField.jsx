import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sports: '',
      cricket: '',
      football: '',
    };
  }

  render() {
    const { error, ...rest } = this.props;
    const errorStyle = (error) ? { ...style.error } : {};
    return (
      <>
        <input type="text" {...rest} style={{ ...style.base, ...errorStyle }} />
        {(error) ? <p style={{ color: 'red' }}>{error}</p> : ''}
      </>
    );
  }
}

TextField.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
TextField.defaultProps = {
  error: '',
  value: '',
  onChange: {},
};
export default TextField;
