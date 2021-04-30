import React, { Component } from "react";
import Popup from "reactjs-popup";
import { Button } from "@material-ui/core";
import { projectFirestore } from "../firebase/config";
import ModalForm from "./ModalForm";
import ModalMessage from "./ModalMessage";

import "reactjs-popup/dist/index.css";

export class Item extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);

    this.state = {
      isEditModalOpen: false,
      isDeleteModalOpen: false,
    };
  }

  closeDeleteModal() {
    this.setState({ isDeleteModalOpen: false });
  }

  handleDelete(event) {
    this.setState({ isDeleteModalOpen: true });
  }

  handleDeleteConfirm(event) {
    projectFirestore
      .collection("products")
      .doc(this.props.id)
      .delete()
      .then(() => {
        // Do nothing
      })
      .catch((error) => {
        console.error(error);
      });
  }

  closeEditModal() {
    this.setState({ isEditModalOpen: false });
  }

  handleEdit(event) {
    this.setState({ isEditModalOpen: true });
  }

  render() {
    return (
      <div style={blockContainer}>
        <Button
          onClick={this.handleEdit}
          variant="contained"
          color="primary"
          style={buttonStyle}
        >
          Edit
        </Button>
        <Popup
          open={this.state.isEditModalOpen}
          position="center center"
          modal
          nested
          closeOnDocumentClick
          contentStyle={modalFromStyle}
          onClose={this.closeEditModal}
        >
          <ModalForm
            onModalClose={this.closeEditModal}
            onItemUpdated={this.props.onItemUpdate}
            id={this.props.id}
            name={this.props.name}
            category={this.props.category}
            price={this.props.price}
            categories={this.props.categories}
          />
        </Popup>
        <Button
          onClick={this.handleDelete}
          variant="contained"
          color="secondary"
          style={buttonStyle}
        >
          Delete
        </Button>
        <Popup
          open={this.state.isDeleteModalOpen}
          position="center center"
          modal
          closeOnDocumentClick
          contentStyle={modalMessageStyle}
          onClose={this.closeDeleteModal}
        >
          <ModalMessage
            onCancel={this.closeDeleteModal}
            onDelete={this.handleDeleteConfirm}
          />
        </Popup>
      </div>
    );
  }
}

const blockContainer = {
  padding: "1px"
};

const modalFromStyle = {
  borderRadius: "5px",
  width: "75%",
};

const modalMessageStyle = {
  borderRadius: "5px",
  width: "75%",
};

const buttonStyle = {
  margin: "5px 10px"
};

export default Item;
