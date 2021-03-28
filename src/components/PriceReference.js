import React, { Component } from "react";
import SearchBar from "./SearchBar";
import ItemList from "./ItemList";
import Papa from "papaparse";
import Data from "../data.json";
import {projectFirestore} from "../firebase/config"

export class PriceReference extends Component {
  constructor(props) {
    super(props);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.state = { searchText: "", products: [], categories: [], unsub: null };
  }

  componentDidMount() {
    // Get data from firestore snapshot
    var data = [];
    const unsubscribe = projectFirestore.collection('products')
    .onSnapshot((snap) => {
      // Clear data array
      data = [];
      // Obtain data from database
      snap.forEach(doc => {
        data.push({...doc.data(), id: doc.id});
      });
      // Update state values
      this.setState({
        products: data,
        categories: this.getUniqueCategories(data),
        unsub: unsubscribe
      });
    });
    // this.setState({
    //   products: Data,
    //   categories: this.getUniqueCategories(Data)
    // })
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

  componentWillUnmount() {
    this.state.unsub();
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
