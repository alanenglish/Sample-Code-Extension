import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { fetchListing } from '../utils/API';

class ListedItemDetail extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object.isRequired
  }

  static defaultProps = {
    match: {}
  }

  state = {
    listing: null
  }

  async componentDidMount() {
    const response = await fetchListing(this.props.match.params.id);

    this.setState({
      listing: response
    });
  }

  render() {
    const { listing } = this.state;

    return (
      <div className="content-container">
        <div>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>Back</button>
        </div>
        { this.state.listing &&
          <div className="category-show">
            <h1 className="category-show__header">{listing.title}</h1>
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-12 left-col">
                <img
                  className="category-show__img"
                  alt={listing.title}
                  src={listing.photos[0]._links.full.href}
                />
              </div>
              <div className="col-lg-7 col-md-7 col-sm-12 right-col">
                <div className="category-show__attribute">
                  Make: <span className="make">{listing.make}</span>
                </div>
                <div className="category-show__attribute">
                  Model: <span className="model">{listing.model}</span>
                </div>
                { this.state.listing.year &&
                  <div className="category-show__attribute">
                    Year: <span className="year">{listing.year}</span>
                  </div>
                }
                { this.state.listing.finish &&
                  <div className="category-show__attribute">
                    Finish: <span className="finish">{listing.finish}</span>
                  </div>
                }
                <div className="category-show__attribute">
                  Description: <span className="description">{listing.description}</span>
                </div>
                <div className="category-show__attribute">
                  Price: <span className="price">{numeral(listing.price.amount_cents / 100).format('$0,0.00')}</span>
                </div>
                <div className="category-show__attribute">
                  Condition: <span className="condition">{listing.condition.display_name}</span>
                </div>
                <div className="category-show__attribute">
                  Shop Name: <span className="shop-name">{listing.shop_name}</span>
                </div>
                { this.state.listing.shop.preferred_seller &&
                  <div className="category-show__attribute">
                    Preferred Seller: <span className="preferred-seller">Yes</span>
                  </div>
                }
                <div className="category-show__attribute">
                  Return Policy: <span className="return-policy">{listing.return_policy.description}</span>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ListedItemDetail;

// console.log(props.match.params.id);
// props.location.state
