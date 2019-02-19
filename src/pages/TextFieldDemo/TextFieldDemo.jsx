import React from 'react';
import { TextField } from '../../components';

const TextFieldDemo = () => (
  <>
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <h1>This is a Disabled Input</h1>
      <TextField disabled="true" value="Disabled Input" />
      <h1>A Valid Input</h1>
      <TextField value="Accessible" />
      <h1>An Input with errors</h1>
      <TextField value="101" error="Could not be greater than" />
    </div>
  </>
);
export default TextFieldDemo;
