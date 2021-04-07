import React from "react";
import { projectFirestore } from "../firebase/config";

class AddForm extends React.Component {
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

    // Add data to the firestore database
    projectFirestore.collection("products").add({
      name: this.state.name,
      category: this.state.category,
      price: this.state.price,
    });

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
