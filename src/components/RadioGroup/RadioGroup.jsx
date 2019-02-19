import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style';

class RadioGroup extends Component {
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
    // eslint-disable-next-line no-console
    // console.log(this.state);
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

RadioGroup.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf({ Label: PropTypes.string }),
  onChange: PropTypes.func,
};
RadioGroup.defaultProps = {
  error: '',
  value: '',
  onChange: {},
  options: [],
};
export default RadioGroup;
