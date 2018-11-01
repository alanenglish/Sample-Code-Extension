import React from 'react';
import { mount } from 'enzyme';
import * as API from '../../utils/API';
import Categories from '../../components/Categories';
/* eslint-env jest */

describe('<Categories />', () => {
  let response;

  beforeEach(() => {
    response = Promise.resolve({
      categories: [
        { uuid: '1', full_name: 'Electric Guitars' },
        { uuid: '2', full_name: 'Acoustic Guitars' }
      ]
    });

    jest.spyOn(API, 'fetchCategories').mockImplementation(() => (response));
  });

  it('displays categories from the API on mount', async () => {
    const page = mount(<Categories />);
    await response;

    page.update();
    expect(page.find('li').length).toEqual(2);

    expect(page.find('li').at(0).text()).toEqual('Electric Guitars');
    expect(page.find('li').at(1).text()).toEqual('Acoustic Guitars');
  });

  it('filters categories', async () => {
    const page = mount(<Categories />);
    await response;

    page.update();

    page.find('input').simulate('change', { target: { value: 'acoustic' } });
    expect(page.find('li').length).toEqual(1);
    expect(page.find('li').at(0).text()).toEqual('Acoustic Guitars');
  });
});
