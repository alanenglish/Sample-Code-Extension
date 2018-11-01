import React from 'react';
import { shallow } from 'enzyme';
import CategoryListings from '../../components/CategoryListings';
/* eslint-env jest */

let fetchCategoryListings;
let wrapper;

beforeEach(() => {
  fetchCategoryListings = jest.fn();
  wrapper = shallow(<CategoryListings fetchCategoryListings={fetchCategoryListings} />);
});

test('should render the CategoryListings correctly', () => {
  expect(wrapper).toMatchSnapshot();
});
