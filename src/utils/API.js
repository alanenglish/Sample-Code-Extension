const CATEGORIES_URL = 'https://api.reverb.com/api/categories/flat';
const LISTINGS_URL = 'https://api.reverb.com/api/listings';
const CATEGORY_LISTINGS_URL = 'https://api.reverb.com/api/listings?category_uuid=';

const HEADERS = {
  Accept: 'application/json',
  'Accept-Version': '3.0',
  'Content-Type': 'application/json'
};

/**
 *  getJSON method always returns an Object
 */

async function getJSON(url, currency = 'USD', region = 'XX') {
  const response = await fetch(url, { headers: { ...HEADERS, 'X-Display-Currency': currency, 'X-Shipping-Region': region } });
  return await response.json();
}

export async function fetchCategories() {
  return getJSON(CATEGORIES_URL);
}

export async function fetchListings(page = 1, perPage = 10, currency = 'USD') {
  return getJSON(`${LISTINGS_URL}/?page=${page}&per_page=${perPage}`, currency);
}

export async function fetchCategoryListings(id, currency = 'USD', region = 'XX') {
  return getJSON(`${CATEGORY_LISTINGS_URL}${id}`, currency, region);
}

export async function fetchListing(id) {
  return getJSON(`${LISTINGS_URL}/${id}`);
}

// export async function fetchListings() {
//   return getJSON(LISTINGS_URL);
// }

// ERROR HANDLING OPTIONS
// if (response.status !== 200) {
//   return { error: true };
// }

// if (response.status !== 200) {
//   let message = { message: 'default error' };
//   try {
//     message = await response.json();
//   } catch (error) {
//     // does nothing
//   }
//   return message;
// }
