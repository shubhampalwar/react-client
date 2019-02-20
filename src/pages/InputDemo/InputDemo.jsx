import React, { Component } from 'react';
import { TextField, RadioGroup, SelectField } from '../../components';
import { OPTIONS, FOOTBALL, CRICKET } from '../../configs/constants';
import { style } from './style';

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sports: '',
      cricket: '',
      football: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    }, () => {
      // eslint-disable-next-line no-console
      console.log(this.state);
    });
  }

  handleSportChange = (event) => {
    this.setState({
      sports: event.target.value,
      football: '',
      cricket: '',
    }, () => {
      // eslint-disable-next-line no-console
      console.log(this.state);
    });
  }

  handleRoleChange =(event) => {
    const { sports } = this.state;
    if (sports === 'Football') {
      this.setState({
        football: event.target.value,
      }, () => {
        // eslint-disable-next-line no-console
        console.log(this.state);
      });
    } else if (sports === 'Cricket') {
      this.setState({
        cricket: event.target.value,
      }, () => {
        // eslint-disable-next-line no-console
        console.log(this.state);
      });
    }
  }

  render() {
    let array;
    const { name, sports } = this.state;
    if (sports === 'Football') {
      array = FOOTBALL;
    } else if (sports === 'Cricket') {
      array = CRICKET;
    }
    return (
      <>
        <div style={style.base}>
          <h3>Name</h3>
          <TextField value={name} onChange={this.handleNameChange} />
        </div>
        <div style={style.base}>
          <h3>Select the game you play</h3>
          <SelectField value={sports} options={OPTIONS} onChange={this.handleSportChange} />
        </div>
        <div>
          {
            (sports) ? <RadioGroup value={sports} options={array} onChange={this.handleRoleChange} /> : ''
          }
        </div>
      </>
    );
  }
}
export default InputDemo;
