import { shallow } from 'enzyme';
import React from 'react';
import Math from './Math';

const wrapper = shallow(<Math first="3" second="3" operator="*" />);

describe('Math', () => {
  it('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
