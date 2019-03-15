import { shallow } from 'enzyme';
import React from 'react';
import TextField from './TextField';

const wrapper = shallow(<TextField />);

describe('TextField', () => {
  it('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
