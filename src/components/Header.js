import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <div className="header">
    <div className="header__content">
      <NavLink
        activeClassName="header__link--active"
        to="/categories"
        className="header__link"
      >
        Categories
      </NavLink>
      <h1 className="header__title">Reverbished</h1>
      <NavLink
        to="/listings"
        activeClassName="header__link--active"
        className="header__link"
        exact
      >
        Listings
      </NavLink>
    </div>
  </div>
);

export default Header;
