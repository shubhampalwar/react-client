import React, { Component } from 'react';
import PropTypes from 'prop-types';
import btnStyle from './style';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      color, disabled, style, ...rest
    } = this.props;
    const btnColor = !btnStyle[color] || color === 'default' || disabled
      ? {}
      : btnStyle[color];
    return (
      <>
        <input id="Button" style={{ ...btnStyle.base, ...btnColor }} disabled={disabled} type="button" {...rest} />
      </>
    );
  }
}

Button.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
Button.defaultProps = {
  disabled: false,
  color: 'primary',
  style: {},
};
export default Button;
