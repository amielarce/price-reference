import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import { projectFirestore } from "../firebase/config";
import CategorySelect from "./CategorySelect";

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      price: "",
      options: [],
      isDataReady: false,
    };

    // Bind functions
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getDefaultCategory = this.getDefaultCategory.bind(this);
  }

  componentDidMount() {
    // Create selector options
    var options = [];
    this.props.categories.forEach((category) => {
      if (category !== "All") {
        var option = {
          value: category,
          label: category,
        };
        options.push(option);
      }
    });
    this.setState({ options });

    // Set initial values for states
    if (this.props.id !== "") {
      // Fetch data from database
      var docRef = projectFirestore.collection("products").doc(this.props.id);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.setState({ ...doc.data(), isDataReady: true });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    } else {
      this.setState({ isDataReady: true });
    }
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleCategoryChange(value) {
    console.log(value);
    this.setState({ category: value });
  }

  handlePriceChange(event) {
    this.setState({ price: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.id !== "") {
      // Update data on firestore
      var docRef = projectFirestore.collection("products").doc(this.props.id);
      docRef
        .update({
          name: this.state.name,
          category: this.state.category,
          price: this.state.price,
        })
        .then(() => {
          this.props.onModalClose();
          this.props.onItemUpdated();
          console.log("Document successfully updated.");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    } else {
      // Add data to the firestore database
      projectFirestore
        .collection("products")
        .add({
          name: this.state.name,
          category: this.state.category,
          price: this.state.price,
        })
        .then(() => {
          this.props.onModalClose();
          console.log("Document successfully added.");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  }

  handleCancelClick(event) {
    this.props.onModalClose();
  }

  getDefaultCategory(value) {
    var index = this.state.options.findIndex(
      (option) => value === option.value
    );
    console.log("Index is " + index);
    return index;
  }

  render() {
    if (!this.state.isDataReady) {
      return (
        <div>
          <div>
            <CircularProgress />
          </div>
          <div>Fetching data</div>
        </div>
      );
    } else {
      return (
        <div>
          <div>Add Product</div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                Name:
                <input
                  type="text"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                />
              </label>
            </div>
            <div>
              <label>
                Category:
                <CategorySelect
                  options={this.state.options}
                  defaultValue={
                    this.state.category === ""
                      ? null
                      : this.state.options[
                          this.getDefaultCategory(this.state.category)
                        ]
                  }
                  onChange={this.handleCategoryChange}
                />
              </label>
            </div>
            <div>
              <label>
                Price:
                <input
                  type="text"
                  value={this.state.price}
                  onChange={this.handlePriceChange}
                />
              </label>
            </div>
            <div>
              <input
                type="submit"
                value={this.props.id === "" ? "Add" : "Update"}
              />
              <button onClick={this.handleCancelClick}>Cancel</button>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default AddForm;
