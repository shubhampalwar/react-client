import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style';

class SelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      error, options, defaultText, title, ...rest
    } = this.props;
    const errorStyle = error ? { ...style.error } : {};
    return (
      <>
        <div style={style.title}>{title}</div>
        <select
          value={defaultText}
          {...rest}
          style={{ ...style.base, ...errorStyle }}
        >
          <option style={style.base} value="" disabled>
            {defaultText}
          </option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div style={style.errorText}>{error}</div>
      </>
    );
  }
}

SelectField.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ),
  defaultText: PropTypes.string,
  title: PropTypes.string.isRequired,
};
SelectField.defaultProps = {
  defaultText: 'Select',
  error: '',
  options: [],
};
export default SelectField;
