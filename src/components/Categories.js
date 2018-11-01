import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { fetchCategories } from '../utils/API';
import CategoryListings from './CategoryListings';

export default class Categories extends Component {
  state = {
    categories: [],
    selectedCategory: null
  }

  async componentDidMount() {
    const resp = await fetchCategories();

    // if (resp.error) {
    //   return;
    // }

    this.setState({
      categories: resp.categories
    });
  }

  onChange = (event) => {
    this.setState({ query: event.target.value });
  }

  setSelectedCategory = (category) => {
    this.setState({ selectedCategory: category });
  }

  filteredCategories = () => {
    if (!this.state.query) { return this.state.categories; }

    return this.state.categories.filter((category) => {
      return category.full_name.match(new RegExp(this.state.query, 'i'));
    });
  }

  render() {
    return (
      <Fragment>
        <div className="search-categories">
          <span className="fa fa-search search-categories__icon"></span>
          <input
            className="search-categories__input"
            type="text"
            onChange={this.onChange}
            placeholder="Filter Categories by Name"
          />
        </div>
        <div className="row category-section">
          <div className="col-lg-4 col-md-5 col-sm-12 left-col">
            <div className="categories">
              <ul className="categories__list">
                {this.filteredCategories().map((category) => (
                  <li
                    key={category.uuid}
                    className={classnames("categories__list-item", { "active-category": this.state.selectedCategory && this.state.selectedCategory.uuid === category.uuid })}
                    onClick={() => this.setSelectedCategory(category)}
                  >
                    {category.full_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-8 col-md-7 col-sm-12 right-col">
            { this.state.selectedCategory ?
              <CategoryListings id={this.state.selectedCategory.uuid} />
              :
              <div className="category-placeholder">
                <img className="placeholder-image" alt="Main Placeholder" src="/images/main-img.jpg" />
              </div>
            }
          </div>
        </div>
      </Fragment>
    );
  }
}
