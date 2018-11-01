import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Categories from '../components/Categories';
import Listings from '../components/Listings';
import Header from '../components/Header';
import ListedItemDetails from '../components/ListedItemDetails';

const AppRouter = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/listings" component={Listings} />
        <Route exact path="/listings/:id" component={ListedItemDetails} />
        <Redirect to="/categories" />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
