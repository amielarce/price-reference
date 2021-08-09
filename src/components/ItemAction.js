import React, { useState } from "react";
import Popup from "reactjs-popup";
import { Button } from "@material-ui/core";
import { projectFirestore } from "../firebase/config";
import ModalForm from "./ModalForm";
import ModalMessage from "./ModalMessage";

const ItemAction = (props) => {
  // Initialize states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = (event) => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = (event) => {
    projectFirestore
      .collection("products")
      .doc(props.id)
      .delete()
      .then(() => {
        // Do nothing
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEdit = (event) => {
    setIsEditModalOpen(true);
  };

  return (
    <div style={blockContainer}>
      <Button
        onClick={handleEdit}
        variant="contained"
        color="primary"
        style={buttonStyle}
      >
        Edit
      </Button>
      <Popup
        open={isEditModalOpen}
        position="center center"
        modal
        nested
        closeOnDocumentClick
        contentStyle={modalFromStyle}
        onClose={closeEditModal}
      >
        <ModalForm
          onModalClose={closeEditModal}
          onItemUpdated={props.onItemUpdate}
          id={props.id}
          name={props.name}
          category={props.category}
          price={props.price}
          categories={props.categories}
        />
      </Popup>
      <Button
        onClick={handleDelete}
        variant="contained"
        color="secondary"
        style={buttonStyle}
      >
        Delete
      </Button>
      <Popup
        open={isDeleteModalOpen}
        position="center center"
        modal
        closeOnDocumentClick
        contentStyle={modalMessageStyle}
        onClose={closeDeleteModal}
      >
        <ModalMessage
          onCancel={closeDeleteModal}
          onDelete={handleDeleteConfirm}
        />
      </Popup>
    </div>
  );
};

const blockContainer = {
  padding: "1px",
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
  margin: "5px 10px",
};

export default ItemAction;
