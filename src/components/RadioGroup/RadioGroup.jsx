/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style';

class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      error, title, options, value, ...rest
    } = this.props;
    return (
      <>
        <div style={style.title}>{title}</div>
        {options.map(option => (
          <label key={option.value}>
            <input type="radio" {...rest} name={value} value={option.value} />
            {option.label}
            <br />
          </label>
        ))}
        <div style={style.errorText}>{error}</div>
      </>
    );
  }
}

RadioGroup.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ),
  title: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
RadioGroup.defaultProps = {
  error: '',
  options: [],
  title: '',
};
export default RadioGroup;
