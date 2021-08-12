import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TextField, Grid, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { projectFirestore } from "../firebase/config";

import Progress from "./Progress";

const ModalForm = ({id, onModalClose, onItemUpdated}) => {
  // Obtain store data
  const product = useSelector((state) => state.product.products.find((product) => product.id === id));
  const options = useSelector((state) => state.category.categories.filter((category) => category !== 'All'));
  const header = product ? "Update Entry" : "Add New Entry";

  // Initialize states
  const [name, setName] = useState(product ? product.name : "");
  const [category, setCategory] = useState(product ? product.category : "");
  const [price, setPrice] = useState(product ? product.price : "");  
  const [status, setStatus] = useState("idle");

  // Update state on name change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Update state when new category is selected
  const handleCategoryChange = (event, value) => {
    value ? setCategory(value) : setCategory("");
  };

  // Update state when new category is inputted
  const handleCategoryInputChange = (event, value) => {
    value && setCategory(value);
  };

  // Update state on price change
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  // Handle Add or Edit button click
  const handleProcessClick = (event) => {
    event.preventDefault();

    setStatus("processing");
    if (product) {
      // Update data on firestore
      var docRef = projectFirestore.collection("products").doc(product.id);
      docRef
        .update({
          name,
          category,
          price,
        })
        .then(() => {
          setStatus("complete");
          onModalClose();
          onItemUpdated();
        })
        .catch((error) => {
          setStatus("complete");
          console.error("Error updating document: ", error);
        });
    } else {
      // Add data to the firestore database
      projectFirestore
        .collection("products")
        .add({
          name,
          category,
          price,
        })
        .then(() => {
          setStatus("complete");
          onModalClose();
        })
        .catch((error) => {
          setStatus("complete");
          console.error("Error adding document: ", error);
        });
    }
  };

  const handleCancelClick = (event) => {
    onModalClose();
  };

  const getDefaultCategory = (value) => {
    return options.findIndex((option) => value === option);
  };

  return (
    <Grid container spacing={2} style={rootStyle}>
      <Grid item xs={12}>
        <div style={headerStyle}>{header}</div>
      </Grid>
      {status !== "idle" && <Progress status={status} />}
      {status === "idle" && (
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  style={inputStyle}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={name}
                  onChange={handleNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  freeSolo
                  options={options}
                  defaultValue={
                    category === ""
                      ? null
                      : options[getDefaultCategory(category)]
                  }
                  value={category}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      style={inputStyle}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  )}
                  onChange={handleCategoryChange}
                  onInputChange={handleCategoryInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={inputStyle}
                  label="Price"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={price}
                  onChange={handlePriceChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs>
                <Button
                  style={buttonStyle}
                  variant="contained"
                  color="primary"
                  onClick={handleProcessClick}
                >
                  {product === "" ? "Add" : "Update"}
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  style={buttonStyle}
                  variant="contained"
                  color="secondary"
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

const inputStyle = {
  padding: "10px 0",
};

const buttonStyle = {
  margin: "auto",
  display: "grid",
  justifyContent: "center",
};

const rootStyle = {
  padding: "16px",
};

const headerStyle = {
  textAlign: "center",
  padding: "5px",
  fontSize: "18px",
};

export default ModalForm;
