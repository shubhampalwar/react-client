import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { error, title, ...rest } = this.props;
    const errorStyle = error ? style.error : {};
    return (
      <>
        <div style={style.title}>{title}</div>
        <input type="text" {...rest} style={{ ...style.base, ...errorStyle }} />
        <div style={style.errorText}>{error}</div>
      </>
    );
  }
}

TextField.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
TextField.defaultProps = {
  error: '',
};
export default TextField;
