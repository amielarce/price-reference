import React, { useState } from "react";
import { Grid, Button, CircularProgress } from "@material-ui/core";

const ModalMessage = ({ onDelete, onCancel }) => {
  // Initialize states
  const [status, setStatus] = useState("idle");

  // Update state on Delete button click
  const handleDelete = () => {
    setStatus("processing");
    onDelete();
  };

  return (
    <Grid container style={rootStyle}>
      <Grid item xs={12} style={headerStyle}>
        Delete Confirmation
      </Grid>
      {status === "processing" && (
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      )}
      <Grid item xs={12} style={messageStyle}>
        {status === "idle" && "Are you sure you want to delete this item?"}
        {status === "processing" && "Deleting item. Please wait."}
      </Grid>
      {status === "idle" && (
        <Grid container>
          <Grid item xs={6}>
            <Button
              style={buttonStyle}
              variant="contained"
              color="primary"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={buttonStyle}
              variant="contained"
              color="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

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
