import React, { Component } from 'react';
import { Slider, TextField } from '../../components';
import { PUBLIC_IMAGE_FOLDER } from '../../configs/constants';

const imgArr = [
  `${PUBLIC_IMAGE_FOLDER}cloud.jpg`,
  `${PUBLIC_IMAGE_FOLDER}dns-server.png`,
  `${PUBLIC_IMAGE_FOLDER}full-stack-web-development.jpg`,
  `${PUBLIC_IMAGE_FOLDER}js.jpg`,
  `${PUBLIC_IMAGE_FOLDER}load-balancer.png`,
];
class TextFieldDemo extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Slider banners={imgArr} />
        <h1>This is a Disabled Input</h1>
        <TextField title="" onChange={() => {}} disabled value="Disabled Input" />
        <h1>A Valid Input</h1>
        <TextField title="" onChange={() => {}} value="Accessible" />
        <h1>An Input with errors</h1>
        <TextField title="" onChange={() => {}} value="101" error="Could not be greater than" />
      </div>
    );
  }
}
export default TextFieldDemo;
