import { shallow } from 'enzyme';
import React from 'react';
import Slider from './Slider';

const wrapper = shallow(<Slider />);

describe('Slider', () => {
  it('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
