import { shallow } from 'enzyme';
import React from 'react';
import SelectField from './SelectField';

const wrapper = shallow(<SelectField />);

describe('Select Field', () => {
  it('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
