import React from 'react';
import PropTypes from 'prop-types';

const ListedItem = ({ listing, size }) => (
  <a href={`/listings/${listing.id}`}>
    <li className={`list-inline-item listed-item ${size}`}>
      <img
        className={`listed-item__img ${size}`}
        alt={listing.title}
        src={listing.photos[0]._links.small_crop.href}
      />
      <div className={`listed-item__title ${size}`}>
        {listing.make} - {listing.model}
      </div>
      <div className={`listed-item__price ${size}`}>
        {listing.price.display}
      </div>
    </li>
  </a>
);

ListedItem.propTypes = {
  listing: PropTypes.object,
  size: PropTypes.string
};

ListedItem.defaultProps = {
  listing: null,
  size: ''
};

export default ListedItem;
