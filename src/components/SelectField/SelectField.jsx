import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style';

class SelectField extends Component {
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
    const {
      error, value, options, ...rest
    } = this.props;
    const errorStyle = (error) ? { ...style.error } : {};
    return (
      <>
        <select {...rest} style={{ ...style.base, ...errorStyle }}>
          <option style={{ ...style.base }} value={options[0].value}>{options[0].label}</option>
        </select>
        {(error) ? <p style={{ color: 'red' }}>{error}</p> : ''}
      </>
    );
  }
}

SelectField.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf({ label: PropTypes.string, value: PropTypes.string }),
  defaultText: PropTypes.string,
};
SelectField.defaultProps = {
  defaultText: 'select',
  error: '',
  value: '',
  options: [{ label: 'Car', value: 'cars' }],
  onChange: {},
};
export default SelectField;
