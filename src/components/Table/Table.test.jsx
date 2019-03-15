import { shallow } from 'enzyme';
import React from 'react';
import Table from './Table';

const wrapper = shallow(<Table />);

describe('Table', () => {
  it('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
