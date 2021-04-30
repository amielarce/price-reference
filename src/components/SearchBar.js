import React, { Component } from "react";
import { TextField } from "@material-ui/core";

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
      <div style={{ width: "100%" }}>
        <TextField
          style={inputStyle}
          type="search"
          variant="outlined"
          size="small"
          placeholder="Search..."
          fullWidth
          value={searchText}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const inputStyle = {
  margin: "3px",
  width: "98%"
};

export default SearchBar;
