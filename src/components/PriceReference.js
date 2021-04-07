import React, { Component } from "react";
import { Fab } from "react-tiny-fab";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "react-tiny-fab/dist/styles.css";
import { projectFirestore } from "../firebase/config";
import SearchBar from "./SearchBar";
import ItemList from "./ItemList";
import AddForm from "./AddForm";

export class PriceReference extends Component {
  constructor(props) {
    super(props);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.state = { searchText: "", products: [], categories: [], unsub: null };
  }

  componentDidMount() {
    // Get data from firestore snapshot
    var data = [];
    const unsubscribe = projectFirestore
      .collection("products")
      .onSnapshot((snap) => {
        // Clear data array
        data = [];
        // Obtain data from database
        snap.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        // Update state values
        this.setState({
          products: data,
          categories: this.getUniqueCategories(data),
          unsub: unsubscribe,
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

  onAddItem() {
    console.log("Add button pressed.");
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
      <div style={{ width: "100%" }}>
        <SearchBar
          searchText={this.state.searchText}
          onSearchTextChange={this.onSearchTextChange}
        />
        <ItemList
          searchItem={this.state.searchText}
          products={this.state.products}
          categories={this.state.categories}
        />
        <Popup
          trigger={
            <Fab
              mainButtonStyles={fabStyle}
              icon={<div>+</div>}
              //onClick={this.onAddItem}
              event="click"
            />
          }
          position="center center"
          modal
        >
          <AddForm />
        </Popup>
      </div>
    );
  }
}

const fabStyle = {
  backgroundColor: "red",
};

export default PriceReference;
