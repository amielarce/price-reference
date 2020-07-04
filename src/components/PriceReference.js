import React, { Component } from "react";
import SearchBar from "./SearchBar";
import ItemList from "./ItemList";
import Papa from "papaparse";
import Data from "../data.json";

export class PriceReference extends Component {
  constructor(props) {
    super(props);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.state = { searchText: "", products: [], categories: [] };
  }

  componentDidMount() {
    this.setState({
      products: Data,
      categories: this.getUniqueCategories(Data)
    })
    // console.log(Data);
    // Papa.parse(
    //   "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFvcgfAORNuC6zivcdvnJJezWQkziCezMPRtzkFBKjZ6d2MtukYH6hOOdAffWDeFVm4mkh8m2K4naF/pub?gid=0&single=true&output=csv",
    //   {
    //     download: true,
    //     header: true,
    //     complete: (results) => {
    //       this.setState({
    //         products: results.data,
    //         categories: this.getUniqueCategories(results.data)
    //       });
    //     },
    //   }
    // );
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
      <div style={{width: "100%"}}>
        <SearchBar
          searchText={this.state.searchText}
          onSearchTextChange={this.onSearchTextChange}
        />
        <ItemList
          searchItem={this.state.searchText}
          products={this.state.products}
          categories={this.state.categories}
        />
      </div>
    );
  }
}

export default PriceReference;
