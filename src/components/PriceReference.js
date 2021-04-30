import React, { Component } from "react";
import { Fab } from "react-tiny-fab";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "react-tiny-fab/dist/styles.css";
import { projectFirestore } from "../firebase/config";
import SearchBar from "./SearchBar";
import ItemList from "./ItemList";
import ModalForm from "./ModalForm";

export class PriceReference extends Component {
  constructor(props) {
    super(props);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      searchText: "",
      products: [],
      categories: [],
      unsub: null,
      isModalOpen: false,
    };
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

        // Sort data by name
        data.sort((a, b) => {
          var nameA = a.name.toUpperCase();
          var nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });

        // Update state values
        this.setState({
          products: data,
          categories: this.getUniqueCategories(data),
        });
      });

    this.setState({ unsub: unsubscribe });
  }

  componentWillUnmount() {
    this.state.unsub();
  }

  onSearchTextChange(searchText) {
    this.setState({ searchText });
  }

  onAddItem() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  getUniqueCategories(product) {
    const categorySet = new Set();
    categorySet.add("All"); // Initial category
    product.forEach((product) => {
      categorySet.add(product.category);
    });

    return Array.from(categorySet).sort();
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
        <Fab
          mainButtonStyles={fabStyle}
          icon={<div>+</div>}
          onClick={this.onAddItem}
          event="click"
        />
        <Popup
          open={this.state.isModalOpen}
          position="center center"
          modal
          nested
          closeOnDocumentClick
          contentStyle={contentStyle}
          onClose={this.closeModal}
        >
          <ModalForm
            onModalClose={this.closeModal}
            id=""
            categories={this.state.categories}
          />
        </Popup>
      </div>
    );
  }
}

const fabStyle = {
  backgroundColor: "#f50057",
  margin: "0",
  bottom: "24px",
  right: "20px",
  position: "fixed"
};

const contentStyle = {
  borderRadius: "5px",
  width: "75%",
};

export default PriceReference;
