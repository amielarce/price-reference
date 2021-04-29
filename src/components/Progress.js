import React, { Component } from "react";
import { CircularProgress, Grid } from "@material-ui/core";

class Progress extends Component {
 
  render() {
    return (
      <Grid item xs={12}>
        {this.props.status === "processing" && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CircularProgress style={progressStyle} />
            </Grid>
            <Grid item xs={12} style={textStyle}>
              Processing data. Please wait.
            </Grid>
          </Grid>
        )}
        {this.props.status === "complete" && (
          <Grid container spacing={2}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12} style={textStyle}>
              Data processing is complete.
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}

const progressStyle = {
    margin: "auto",
    display: "grid",
    justifyContent: "center"
}

const textStyle = {
    textAlign: "center"
}

export default Progress;
