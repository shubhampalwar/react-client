/* eslint-disable no-console */
import * as yup from 'yup';
import React, { Component } from 'react';
import {
  TextField, RadioGroup, SelectField, Button,
} from '../../components';
import {
  OPTIONS, FOOTBALL, CRICKET, FOOTBALL_OPS, CRICKET_OPS,
} from '../../configs/constants';
import { style } from './style';

const playerSchema = yup.object({
  name: yup.string().min(3).required().label('name'),
  sports: yup.string().required().label('sports'),
  football: yup.string().label('What do you do').when('sport', {
    is: val => val === FOOTBALL,
    then: yup.string().required(),
    otherwise: yup.string().min(0),
  }),
  cricket: yup.string().label('What do you do').when('sport', {
    is: val => val === CRICKET,
    then: yup.string().required(),
    otherwise: yup.string().min(0),
  }),
});
class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sports: '',
      cricket: '',
      football: '',
      errors: {},
      touched: {},
    };
  }

  handleChange = field => (event) => {
    this.setState(
      {
        [field]: event.target.value,
      },
      () => this.handleValidate(),
    );
  };

  handleSportChange = (event) => {
    this.setState(
      {
        sports: event.target.value,
        football: '',
        cricket: '',
      },
      () => this.handleValidate(),
    );
  };

  handleBlur = field => () => {
    const { touched } = this.state;
    touched[field] = true;
    this.setState({ touched }, () => this.handleValidate());
  }

  handleClick = () => {
    console.log(this.state);
  };

  handleError = (errors) => {
    const allErrors = {};
    if (errors) {
      errors.inner.forEach((error) => {
        allErrors[error.path] = error.message;
      });
    }
    console.log(allErrors);
    this.setState({
      errors: allErrors,
    });
  }

  handleValidate = () => {
    const {
      name, sports, football, cricket,
    } = this.state;
    playerSchema.validate({
      name, sports, football, cricket,
    }, { abortEarly: false }).then(() => {
      this.handleError(null);
    }).catch((errors) => {
      this.handleError(errors);
    });
  }

  getErrors = (field) => {
    const { touched, errors } = this.state;
    if (!touched[field]) {
      return null;
    }
    return errors[field] || '';
  }

  renderFootball = () => {
    const { football, sports } = this.state;
    if (sports !== 'Football') {
      return null;
    }
    return (
      <RadioGroup
        value={football}
        title="What do you do?"
        options={FOOTBALL_OPS}
        onBlur={this.handleBlur(FOOTBALL)}
        onChange={this.handleChange(FOOTBALL)}
      />
    );
  }

  renderCricket = () => {
    const { cricket, sports } = this.state;
    if (sports !== 'Cricket') {
      return null;
    }
    return (
      <RadioGroup
        value={cricket}
        title="What do you do?"
        options={CRICKET_OPS}
        onBlur={this.handleBlur(CRICKET)}
        onChange={this.handleChange(CRICKET)}
        error={this.getErrors(CRICKET)}
      />
    );
  }

  hasError = () => {
    const { errors } = this.state;
    return (Object.keys(errors).length !== 0);
  }

  isTouched = () => {
    const { touched } = this.state;
    return (Object.keys(touched).length !== 0);
  }

  render() {
    const { name, sports } = this.state;
    return (
      <>
        <div style={style.base}>
          <TextField
            value={name}
            placeholder="Enter Your Name"
            title="Name"
            onChange={this.handleChange('name')}
            onBlur={this.handleBlur('name')}
            error={this.getErrors('name')}
          />
        </div>
        <div style={style.base}>
          <SelectField
            value={sports}
            title="Select the game you play"
            options={OPTIONS}
            onChange={this.handleSportChange}
            onBlur={this.handleBlur('sports')}
            error={this.getErrors('sports')}

          />
        </div>
        { this.renderCricket() }
        { this.renderFootball() }
        <div style={style.buttonDiv}>
          <Button value="cancel" onClick={this.handleClick} />
          <Button value="submit" onClick={this.handleClick} color="primary" disabled={this.hasError() || this.isTouched()} />
        </div>
      </>
    );
  }
}
export default InputDemo;
