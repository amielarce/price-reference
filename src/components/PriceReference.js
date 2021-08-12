import React, { useState, useEffect } from "react";
import { useDispatch  } from "react-redux";
import { updateProducts } from "../state/reducers/productSlice";
import { updateCategories } from "../state/reducers/categorySlice";
import { Fab } from "react-tiny-fab";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "react-tiny-fab/dist/styles.css";
import { projectFirestore } from "../firebase/config";
import SearchBar from "./SearchBar";
import ItemList from "./ItemList";
import ModalForm from "./ModalForm";

const PriceReference = () => {
  // Initialize states
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dispatch data to update reducer
  const dispatch = useDispatch();

  // Subscribe to firestore using an effect
  useEffect(() => {
    // Get data from firestore snapshot
    var data = [];
    const unsubscribe = projectFirestore
      .collection("products")
      .onSnapshot((snap) => {
        // Clear data array
        data = [];
        // Obtain data from database
        snap.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });

        // Sort data by name
        data.sort((a, b) => {
          var nameA = a.name.toUpperCase();
          var nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });

        // Update state values
        dispatch(updateProducts(data));
        dispatch(updateCategories(getUniqueCategories(data)));
      });

    return unsubscribe;
  }, [dispatch]);

  // Update state on search text change
  const onSearchTextChange = (searchText) => {
    setSearchText(searchText);
  };

  // Update modal open state when adding a new item
  const onAddItem = () => {
    setIsModalOpen(true);
  };

  // Update modal open state when closing the modal window
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Obtain unique categories from the products data set
  const getUniqueCategories = (products) => {
    const categorySet = new Set();
    categorySet.add("All"); // Initial category
    products.forEach((product) => {
      categorySet.add(product.category);
    });

    return Array.from(categorySet).sort();
  };

  return (
    <div style={{ width: "100%" }}>
      <SearchBar
        searchText={searchText}
        onSearchTextChange={onSearchTextChange}
      />
      <ItemList
        searchItem={searchText}
      />
      <Fab
        mainButtonStyles={fabStyle}
        icon={<div>+</div>}
        onClick={onAddItem}
        event="click"
      />
      <Popup
        open={isModalOpen}
        position="center center"
        modal
        nested
        closeOnDocumentClick
        contentStyle={contentStyle}
        onClose={closeModal}
      >
        <ModalForm onModalClose={closeModal} id="" />
      </Popup>
    </div>
  );
};

const fabStyle = {
  backgroundColor: "#f50057",
  margin: "0",
  bottom: "24px",
  right: "20px",
  position: "fixed",
};

const contentStyle = {
  borderRadius: "5px",
  width: "75%",
};

export default PriceReference;
