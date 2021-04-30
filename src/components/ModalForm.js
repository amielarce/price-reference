import React, { Component } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { projectFirestore } from "../firebase/config";

import Progress from "./Progress";

class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "",
      name: "",
      category: "",
      price: "",
      options: [],
      status: "idle",
    };

    // Bind functions
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleProcessClick = this.handleProcessClick.bind(this);
    this.getDefaultCategory = this.getDefaultCategory.bind(this);
    this.handleCategoryInputChange = this.handleCategoryInputChange.bind(this);
  }

  componentDidMount() {
    // Create selector options
    var options = [];
    this.props.categories.forEach((category) => {
      if (category !== "All") {
        options.push(category);
      }
    });
    this.setState({ options });

    // Set initial values for states
    if (this.props.name) this.setState({ name: this.props.name });
    if (this.props.category) this.setState({ category: this.props.category });
    if (this.props.price) this.setState({ price: this.props.price });
    if (this.props.id !== "") {
      this.setState({ header: "Update Entry" });
    } else {
      this.setState({ header: "Add New Entry" });
    }
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleCategoryChange(event, value) {
    if (value) {
      this.setState({ category: value });
    } else {
      this.setState({ category: "" });
    }
  }

  handleCategoryInputChange(event, value) {
    if (value) {
      this.setState({ category: value });
    }
  }

  handlePriceChange(event) {
    this.setState({ price: event.target.value });
  }

  handleProcessClick(event) {
    event.preventDefault();

    this.setState({ status: "processing" });
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
          this.setState({ status: "complete" });
          this.props.onModalClose();
          this.props.onItemUpdated();
        })
        .catch((error) => {
          this.setState({ status: "complete" });
          console.error("Error updating document: ", error);
        });
    } else {
      // Add data to the firestore database
      projectFirestore
        .collection("products")
        .add({
          name: this.state.name,
          category: this.state.category,
          price: this.state.price,
        })
        .then(() => {
          this.setState({ status: "complete" });
          this.props.onModalClose();
        })
        .catch((error) => {
          this.setState({ status: "complete" });
          console.error("Error adding document: ", error);
        });
    }
  }

  handleCancelClick(event) {
    this.props.onModalClose();
  }

  getDefaultCategory(value) {
    var index = this.state.options.findIndex((option) => value === option);
    return index;
  }

  render() {
    return (
      <Grid container spacing={2} style={rootStyle}>
        <Grid item xs={12}>
          <div style={headerStyle}>{this.state.header}</div>
        </Grid>
        {this.state.status !== "idle" && (
          <Progress status={this.state.status} />
        )}
        {this.state.status === "idle" && (
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
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    freeSolo
                    options={this.state.options}
                    defaultValue={
                      this.state.category === ""
                        ? null
                        : this.state.options[
                            this.getDefaultCategory(this.state.category)
                          ]
                    }
                    value={this.state.category}
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
                    onChange={this.handleCategoryChange}
                    onInputChange={this.handleCategoryInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={inputStyle}
                    label="Price"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={this.state.price}
                    onChange={this.handlePriceChange}
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
                    onClick={this.handleProcessClick}
                  >
                    {this.props.id === "" ? "Add" : "Update"}
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button
                    style={buttonStyle}
                    variant="contained"
                    color="secondary"
                    onClick={this.handleCancelClick}
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
  }
}

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
