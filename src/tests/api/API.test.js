import { fetchListings, fetchCategories, fetchCategoryListings, fetchListing } from '../../utils/API';
/* eslint-env jest */

describe('API', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: () => (Promise.resolve({ server: 'HELLO!' }))
        });
      });
    });
  });

  describe('fetchCategories', () => {
    it('should fetch categories', async () => {
      expect.assertions(2);

      const cats = await fetchCategories();

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.reverb.com/api/categories/flat',
        {
          headers: {
            Accept: 'application/json',
            'Accept-Version': '3.0',
            'Content-Type': 'application/json',
            'X-Display-Currency': 'USD',
            'X-Shipping-Region': 'XX'
          }
        }
      );

      expect(cats).toEqual({ server: 'HELLO!' });
    });
  });

  describe('fetchListings', () => {
    it('should fetch listings', async () => {
      expect.assertions(2);

      const listings = await fetchListings();

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.reverb.com/api/listings/?page=1&per_page=10',
        {
          headers: {
            Accept: 'application/json',
            'Accept-Version': '3.0',
            'Content-Type': 'application/json',
            'X-Display-Currency': 'USD',
            'X-Shipping-Region': 'XX'
          }
        }
      );

      expect(listings).toEqual({ server: 'HELLO!' });
    });
  });

  describe('fetchCategoryListings', () => {
    it('should fetch listings', async () => {
      expect.assertions(2);
      const id = '123abc456def';
      const listings = await fetchCategoryListings(id);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.reverb.com/api/listings?category_uuid=123abc456def',
        {
          headers: {
            Accept: 'application/json',
            'Accept-Version': '3.0',
            'Content-Type': 'application/json',
            'X-Display-Currency': 'USD',
            'X-Shipping-Region': 'XX'
          }
        }
      );

      expect(listings).toEqual({ server: 'HELLO!' });
    });
  });

  describe('fetchListing', () => {
    it('should fetch listings', async () => {
      expect.assertions(2);
      const id = '123abc456def';
      const listing = await fetchListing(id);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.reverb.com/api/listings/123abc456def',
        {
          headers: {
            Accept: 'application/json',
            'Accept-Version': '3.0',
            'Content-Type': 'application/json',
            'X-Display-Currency': 'USD',
            'X-Shipping-Region': 'XX'
          }
        }
      );

      expect(listing).toEqual({ server: 'HELLO!' });
    });
  });
});
