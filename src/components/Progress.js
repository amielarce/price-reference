import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";

const Progress = ({ status }) => {
  return (
    <Grid item xs={12}>
      {status === "processing" && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CircularProgress style={progressStyle} />
          </Grid>
          <Grid item xs={12} style={textStyle}>
            Processing data. Please wait.
          </Grid>
        </Grid>
      )}
      {status === "complete" && (
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>
          <Grid item xs={12} style={textStyle}>
            Data processing is complete.
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

const progressStyle = {
  margin: "auto",
  display: "grid",
  justifyContent: "center",
};

const textStyle = {
  textAlign: "center",
};

export default Progress;
