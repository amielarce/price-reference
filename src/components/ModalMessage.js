import React, { Component } from "react";
import { Grid, Button, CircularProgress } from "@material-ui/core";

class ModalMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { status: "idle" };

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.setState({ status: "processing" });
    this.props.onDelete();
  }

  render() {
    return (
      <Grid container style={rootStyle}>
        <Grid item xs={12} style={headerStyle}>
          Delete Confirmation
        </Grid>
        {this.state.status === "processing" && (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        )}
        <Grid items xs={12} style={messageStyle}>
          {this.state.status === "idle" &&
            "Are you sure you want to delete this item?"}
          {this.state.status === "processing" && "Deleting item. Please wait."}
        </Grid>
        {this.state.status === "idle" && (
          <Grid container>
            <Grid item xs={6}>
              <Button
                style={buttonStyle}
                variant="contained"
                color="primary"
                onClick={this.handleDelete}
              >
                Delete
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={buttonStyle}
                variant="contained"
                color="secondary"
                onClick={this.props.onCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}

const headerStyle = {
  textAlign: "center",
  padding: "5px",
  fontSize: "18px",
};

const messageStyle = {
  textAlign: "center",
  padding: "10px",
};

const buttonStyle = {
  margin: "auto",
  display: "grid",
  justifyContent: "center",
};

const rootStyle = {
  padding: "16px",
};

export default ModalMessage;
