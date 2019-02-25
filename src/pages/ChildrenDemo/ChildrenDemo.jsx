import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Math } from '../../components';

class ChildrenDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  customTemplate = (first, second, operator, result) => {
    // console.log(this.getOperator(operator));
    if (!this.getOperator(operator)) { return 'Invalid Operation'; }
    return (
      <p>
        {`${this.getOperator(operator)} of ${first} and ${second} is ${result} `}
      </p>
    );
  }

  getOperator = (operator) => {
    switch (operator) {
    case '+': return 'Sum';
    case '-': return 'Difference';
    case '*': return 'Product';
    case '/': return 'Division';
    default: return null;
    }
  }

  render() {
    return (
      <>
        <p>
          <Math first={7} second={4} operator="+" />
        </p>
        <p>
          <Math first={10} second={3} operator="-" />
        </p>
        <p>
          <Math first={7} second={2} operator="*" />
        </p>
        <p>
          <Math first={24} second={4} operator="/" />
        </p>
        <Typography>
          <p>
            <Math first={7} second={0} operator="/" />
          </p>
        </Typography>
        <p>
          <Math first={7} second={8} operator="^" />
        </p>
        <div>
          <Math first={2} second={0} operator="-">
            {
              this.customTemplate
            }
          </Math>
          <Math first={2} second={0} operator="/">
            {(first, second, operator, result) => {
              if (!this.getOperator(operator)) { return <p>Invalid Operation</p>; }
              return (
                <p>{`When we ${this.getOperator(operator)} ${first} with ${second} we get ${result}`}</p>
              );
            }}
          </Math>
        </div>
      </>
    );
  }
}
export default ChildrenDemo;
