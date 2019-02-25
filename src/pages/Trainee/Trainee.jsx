/* eslint-disable no-console */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { AddDialog } from './components';

class ChildrenDemo extends Component {
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
    }, () => console.log(this.state));
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
        <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} aria-labelledby="Add Trainee" />
      </>
    );
  }
}
export default ChildrenDemo;
