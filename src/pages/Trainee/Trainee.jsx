/* eslint-disable no-console */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { AddDialog } from './components';

class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  handleClick = () => {
    this.setState({
      open: true,
    });
  }

  handelTraineeData = (values) => {
    this.setState({
      open: false,
    }, () => console.log(values));
  }

  render() {
    const { open } = this.state;
    return (
      <>
        <Button variant="outlined" onClick={this.handleClick} color="primary">ADD TRAINEE</Button>
        <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handelTraineeData}/>
      </>
    );
  }
}
export default Trainee;
