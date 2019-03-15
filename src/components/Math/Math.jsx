import { Component } from 'react';
import PropTypes from 'prop-types';

class Math extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  calculations = () => {
    const { first, second, operator } = this.props;
    switch (operator) {
    case '+': return first + second;
    case '-': return first - second;
    case '*': return first * second;
    case '/': return (second === 0) ? 'infinity' : first / second;
    default: return 'Invalid Operator';
    }
  }

  render() {
    const {
      first, second, operator, children,
    } = this.props;
    return (children) ? children(
      first, second, operator, this.calculations(),
    ) : `${first} ${operator} ${second} = ${this.calculations()}`;
  }
}

Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};
Math.defaultProps = {
  children: undefined,
};
export default Math;
