import React from 'react';
import { mount } from 'enzyme';
import * as API from '../../utils/API';
import Listings from '../../components/Listings';
/* eslint-env jest */

describe('<Listings />', () => {
  let response;

  beforeEach(() => {
    response = Promise.resolve({
      listings: [
        {
          id: '1',
          make: 'Fender',
          model: 'Telecaster',
          price: { display: '$600' },
          photos: [
            { _links: { small_crop: { href: 'tele.png' } } }
          ]
        },
        {
          id: '2',
          make: 'Gibson',
          model: 'SG',
          price: { display: '$600' },
          photos: [
            { _links: { small_crop: { href: 'gibson.png' } } }
          ]
        }
      ]
    });

    jest.spyOn(API, 'fetchListings').mockImplementation(() => (response));
  });

  it('displays listings from the API on mount', async () => {
    const page = mount(<Listings />);
    await response;

    page.update();
    expect(page.find('li').length).toEqual(2);

    expect(page.find('.listed-item__title').at(0).text()).toEqual('Fender - Telecaster');
    expect(page.find('.listed-item__price').at(0).text()).toEqual('$600');
    expect(page.find('img').at(0).prop('src')).toEqual('tele.png');

    expect(page.find('.listed-item__title').at(1).text()).toEqual('Gibson - SG');
    expect(page.find('.listed-item__price').at(0).text()).toEqual('$600');
    expect(page.find('img').at(1).prop('src')).toEqual('gibson.png');
  });
});
