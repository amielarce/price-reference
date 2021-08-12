import React from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";
import { setSearchText } from "../state/reducers/searchSlice";

const SearchBar = () => {

  const dispatch = useDispatch();

  // Handle search text change
  const handleChange = (e) => {
    dispatch(setSearchText(e.target.value));
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
