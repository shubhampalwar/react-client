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
      error, value, options, defaultText, label, ...rest
    } = this.props;
    const errorStyle = error ? { ...style.error } : {};
    return (
      <>
        <select
          defaultValue={defaultText}
          {...rest}
          style={{ ...style.base, ...errorStyle }}
        >
          <option style={style.base} value={defaultText} disabled>
            {defaultText}
          </option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div>{error ? <p style={{ color: 'red' }}>{error}</p> : ''}</div>
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
  label: PropTypes.string,
};
SelectField.defaultProps = {
  defaultText: 'Select',
  error: '',
  options: [],
  label: '',
};
export default SelectField;
