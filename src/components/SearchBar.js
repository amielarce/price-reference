import React from "react";
import { TextField } from "@material-ui/core";

const SearchBar = ({ searchText, onSearchTextChange }) => {
  // Handle search text change
  const handleChange = (e) => {
    onSearchTextChange(e.target.value);
  };

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
        onChange={handleChange}
      />
    </div>
  );
};

const inputStyle = {
  margin: "3px",
  width: "98%",
};

export default SearchBar;
