import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";
import categoryReducer from "./reducers/categorySlice";
import searchReducer from "./reducers/searchSlice";

export default configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    search: searchReducer
  },
});
