import React from 'react';
import { mount, shallow } from 'enzyme';
import * as API from '../../utils/API';
import ListedItemDetails from '../../components/ListedItemDetails';
/* eslint-env jest */

describe('<ListedItemDetails />', () => {
  let response;
  let history;

  beforeEach(() => {
    response = Promise.resolve({
      listing: {
        id: '123abc456def',
        title: 'Fender Guitar Brand New',
        make: 'Fender',
        model: 'FSR Stratocaster XII 12 string',
        year: '2017',
        finish: 'Sunburst',
        description: 'Immaculate condition guitar, you will not be disappointed!',
        price: 67500,
        condition: 'Mint',
        shop_name: 'The Official Awesome Reverb Shop',
        preferred_seller: true,
        return_policy: 'This item is sold As-Described and cannot be returned unless it arrives in a condition different from how it was described or photographed.',
        photos: [{ _links: { small_crop: { href: 'http://www.alan.com' } } }]
      }
    });

    history = { goBack: jest.fn() };

    jest.spyOn(API, 'fetchListing').mockImplementation(() => (response));
  });

  it('displays single listing from the API on mount', () => {
    // const page = mount(<ListedItemDetails history={history} />);
    // await response;
    // page.update();
    //
    // expect(page.find('h1').at(0).text()).toEqual('Fender Guitar Brand New');
    const wrapper = shallow(<ListedItemDetails history={history} />);
    const listing = {
      id: '123abc456def',
      title: 'Fender Guitar Brand New',
      make: 'Fender',
      model: 'FSR Stratocaster XII 12 string',
      year: '2017',
      finish: 'Sunburst',
      description: 'Immaculate condition guitar, you will not be disappointed!',
      price: { amount_cents: 67500 },
      condition: { display_name: 'Mint' },
      shop_name: 'The Official Awesome Reverb Shop',
      shop: { preferred_seller: true },
      return_policy: { description: 'This item is sold As-Described and cannot be returned unless it arrives in a condition different from how it was described or photographed.' },
      photos: [{ _links: { full: { href: 'http://www.alan.com' } } }]
    };

    wrapper.setState({ listing: listing });
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});
