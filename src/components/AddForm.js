import { render } from "@testing-library/react";
import React, { Component } from "react";

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      price: "",
    };
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
            <button>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddForm;
