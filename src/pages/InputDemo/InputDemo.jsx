import React, { Component } from 'react';
import { TextField, RadioGroup, SelectField } from '../../components';

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <TextField />
        <RadioGroup />
        <SelectField />
      </div>
    );
  }
}
export default InputDemo;
