import React, { Component } from "react";
import Popup from "reactjs-popup";
import { projectFirestore } from "../firebase/config";
import AddForm from "./AddForm";

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
        console.log("Deleted");
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
        <button onClick={this.handleEdit}>Edit</button>
        <Popup
          open={this.state.isEditModalOpen}
          position="center center"
          modal
          closeOnDocumentClick
          onClose={this.closeEditModal}
        >
          <AddForm onModalClose={this.closeEditModal} onItemUpdated={this.props.onItemUpdate} id={this.props.id} />
        </Popup>
        <button onClick={this.handleDelete}>Delete</button>
        <Popup
          open={this.state.isDeleteModalOpen}
          position="center center"
          modal
          closeOnDocumentClick
          onClose={this.closeDeleteModal}
        >
          <div>Are you sure you want to delete this item?</div>
          <div>
            <button onClick={this.closeDeleteModal}>Cancel</button>
            <button onClick={this.handleDeleteConfirm}>Delete</button>
          </div>
        </Popup>
      </div>
    );
  }
}

const blockContainer = {
  borderBottom: "1px solid gray",
  padding: "10px",
  backgroundColor: "gray",
};

export default Item;
