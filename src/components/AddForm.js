import React, { Component } from "react";
import { projectFirestore } from "../firebase/config";

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      price: "",
    };

    // Bind functions
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.id !== "") {
      // Fetch data from database
      var docRef = projectFirestore.collection("products").doc(this.props.id);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.setState({ ...doc.data() });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleCategoryChange(event) {
    this.setState({ category: event.target.value });
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
          console.log("Document successfully updated.");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    } else {
      // Add data to the firestore database
      projectFirestore.collection("products").add({
        name: this.state.name,
        category: this.state.category,
        price: this.state.price,
      });
    }

    this.props.onModalClose();
  }

  handleCancelClick(event) {
    this.props.onModalClose();
  }

  render() {
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
              <input
                type="text"
                value={this.state.category}
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
            <input type="submit" value="Add" />
            <button onClick={this.handleCancelClick}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddForm;
