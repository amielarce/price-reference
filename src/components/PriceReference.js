import React, { Component } from "react";
import SearchBar from "./SearchBar";
import ItemList from "./ItemList";

export class PriceReference extends Component {
  constructor(props) {
    super(props);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.state = { searchText: "", categories: [] };
  }

  componentDidMount() {
    this.setState({ categories: this.getUniqueCategories(PRODUCT) });
  }

  onSearchTextChange(searchText) {
    this.setState({ searchText });
  }

  getUniqueCategories(product) {
    const categorySet = new Set();
    categorySet.add("All"); // Initial category
    product.forEach((product) => {
      categorySet.add(product.category);
    });

    return Array.from(categorySet);
  }

  render() {
    return (
      <div>
        <SearchBar
          searchText={this.state.searchText}
          onSearchTextChange={this.onSearchTextChange}
        />
        <ItemList
          searchItem={this.state.searchText}
          products={PRODUCT}
          categories={this.state.categories}
        />
      </div>
    );
  }
}

const PRODUCT = [
  { id: "1", name: "Chiz Whiz", category: "Sandwich Spread", price: "11.00" },
  { id: "2", name: "Milo", category: "Powdered Drink", price: "11.00" },
  { id: "3", name: "Bear Brand", category: "Powdered Drink", price: "13.00" },
  { id: "4", name: "Kopiko Brown Coffee", category: "Coffee", price: "8.00" },
  { id: "5", name: "Kopiko Blanka", category: "Coffee", price: "8.00" },
  {
    id: "6",
    name: "Kopiko Blanka Twin Pack",
    category: "Coffee",
    price: "12.00",
  },
  { id: "7", name: "Nescafe Original", category: "Coffee", price: "7.00" },
  {
    id: "8",
    name: "Nescafe Original Twin Pack",
    category: "Coffee",
    price: "12.00",
  },
  { id: "9", name: "Tang Orange", category: "Powdered Drink", price: "19.00" },
  {
    id: "10",
    name: "Nestea Lemon Iced Tea",
    category: "Powdered Drink",
    price: "19.00",
  },
];

export default PriceReference;
