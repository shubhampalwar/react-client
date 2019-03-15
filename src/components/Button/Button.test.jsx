import { shallow } from 'enzyme';
import React from 'react';
import Button from './Button';

const wrapper = shallow(<Button />);

describe('Button', () => {
  it('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
