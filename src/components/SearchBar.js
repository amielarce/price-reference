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
      <div style={{width:"100%"}}>
        <input
          type="text"
          value={searchText}
          style={{width: "98%", padding: "5px 1px", margin: "1px 0px"}}
          placeholder="Search..."
          onChange = {this.handleChange}
        />
      </div>
    );
  }
}

export default SearchBar;
