import React from 'react';
import PropTypes from 'prop-types';
import { fetchCategoryListings } from '../utils/API';
import ListedItem from './ListedItem';
import Loading from './Loading';

export default class CategoryListings extends React.Component {
  static propTypes = {
    id: PropTypes.string
  }

  static defaultProps = {
    id: ''
  }

  state = {
    categoryListings: [],
    isLoading: true,
    currency: 'USD',
    region: 'XX'
  }

  componentDidMount() {
    this.fetchCatListings(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.fetchCatListings(this.props.id, this.state.currency, this.state.region);
    }
  }

  onCurrencyChange = (event) => {
    const currency = event.target.value;
    this.fetchCatListings(this.props.id, currency, this.state.region);

    this.setState({
      currency
    });
  }

  onRegionChange = (event) => {
    const region = event.target.value;
    this.fetchCatListings(this.props.id, this.state.currency, region);

    this.setState({
      region
    });
  }

  async fetchCatListings(id, currency, region) {
    const response = await fetchCategoryListings(id, currency, region);

    this.setState({
      categoryListings: response.listings,
      isLoading: false
    });
  }

  displayListings = () => {
    return this.state.categoryListings.map((listing) => <ListedItem key={listing.id} listing={listing} size="small" />);
  }

  render() {
    const { isLoading } = this.state
    return (
      <div className="category-results">
        { !isLoading &&
          <div className="row selectors_container">
            <div className="selector-wrapper">
              <label className="selector-label">Currency</label>
              <select
                value={this.state.currency}
                onChange={(event) => this.onCurrencyChange(event)}
                className="currency-selector"
              >
                <option value="USD">$ (USD)</option>
                <option value="EUR">€ (EUR)</option>
                <option value="GBP">£ (GBP)</option>
                <option value="JPY">¥ (JPY)</option>
                <option value="CAD">$ (CAD)</option>
              </select>
            </div>
            <div className="selector-wrapper">
              <label className="selector-label">Ships To</label>
              <select
                value={this.state.region}
                onChange={(event) => this.onRegionChange(event)}
                className="region-selector"
              >
                <option value="XX">Global</option>
                <option value="US">USA</option>
                <option value="FR">France</option>
                <option value="JP">Japan</option>
                <option value="CA">Canada</option>
              </select>
            </div>
          </div>
        }
        <ul className="list-inline mt-2">
          {this.displayListings()}
          { isLoading && <Loading /> }
        </ul>
      </div>
    );
  }
}
