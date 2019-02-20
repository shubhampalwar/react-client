import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { value, ...rest } = this.props;
    return (
      <>
        <input type="button" value={value} {...rest} />
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
