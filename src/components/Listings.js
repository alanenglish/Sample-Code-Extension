import React, { Component, Fragment } from 'react';
import { fetchListings } from '../utils/API';
import ListedItem from './ListedItem';
import Loading from './Loading';

export default class Listings extends Component {
  state = {
    listings: [],
    initialLoading: true,
    isLoading: true,
    currentPage: 1
  }

  async componentDidMount() {
    const response = await fetchListings();

    this.setState({
      listings: response.listings,
      isLoading: false,
      initialLoading: false
    });
  }

  displayListings = () => {
    return this.state.listings.map((listing) => <ListedItem key={listing.id} listing={listing} size="big" />);
  }

  async loadMoreListings() {
    this.setState({ isLoading: true });

    const response = await fetchListings(this.state.currentPage + 1);

    this.setState({
      listings: [...this.state.listings, ...response.listings],
      isLoading: false,
      currentPage: this.state.currentPage + 1
    });
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          <ul className="list-inline mt-5 text-center">
            {this.displayListings()}
          </ul>
          {this.state.initialLoading &&
            <div className="load-container">
              <Loading />
            </div>
          }
        </div>
        { !this.state.isLoading &&
          <div className="text-center mt-5 mb-5">
            <button
              onClick={() => this.loadMoreListings()}
              className="load-items__btn"
            >
              Load More Items
            </button>
          </div>
        }
      </Fragment>
    );
  }
}
