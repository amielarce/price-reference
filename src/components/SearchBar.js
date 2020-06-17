import React, { Component } from "react";

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onSearchTextChange(e.target.value);    
  }

  render() {
    const searchText = this.props.searchText;
    return (
        <input
          type="text"
          value={searchText}
          style={{ flex: "10", padding: "5px", width: "100%" }}
          placeholder="Search..."
          onChange = {this.handleChange}
        />
    );
  }
}

export default SearchBar;
