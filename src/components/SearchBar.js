import React, { Component } from "react";

export class SearchBar extends Component {
  render() {
    return (
        <input
          type="text"
          name="title"
          style={{ flex: "10", padding: "5px" }}
          placeholder="Search..."
        />
    );
  }
}

export default SearchBar;
