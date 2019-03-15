import { shallow } from 'enzyme';
import React from 'react';
import withLoaderAndMessage from './withLoaderAndMessage';

const wrapper = shallow(<withLoaderAndMessage />);

describe('withLoaderAndMessage', () => {
  it('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
