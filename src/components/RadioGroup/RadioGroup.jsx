/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      error, options, value, ...rest
    } = this.props;
    return (
      <>
        <h3>What do you do?</h3>
        {options.map(option => (
          <label key={option.value}>
            <input type="radio" {...rest} name={value} value={option.value} />
            {option.label}
            <br />
          </label>
        ))}
        {error ? <p style={{ color: 'red' }}>{error}</p> : ''}
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
  onChange: PropTypes.func.isRequired,
};
RadioGroup.defaultProps = {
  error: '',
  options: [],
};
export default RadioGroup;
