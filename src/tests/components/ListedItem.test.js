import React from 'react';
import { shallow } from 'enzyme';
import ListedItem from '../../components/ListedItem';
/* eslint-env jest */

test('should render ListedItem correctly', () => {
  const listing = {
    id: '123abc456def',
    title: 'Fender Bender',
    make: 'Fender',
    model: 'Bender',
    price: { display: '$1500' },
    photos: [{ _links: { small_crop: { href: 'http://www.alan.com' } } }]
  };

  const size = 'small';

  const wrapper = shallow(<ListedItem listing={listing} size={size} />);
  expect(wrapper).toMatchSnapshot();
});
