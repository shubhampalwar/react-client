import { shallow } from 'enzyme';
import React from 'react';
import RadioGroup from './RadioGroup';

const wrapper = shallow(<RadioGroup />);

describe('RadioGroup', () => {
  it('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
