import React from "react";
import { useSelector } from "react-redux";

const Item = ({ id }) => {
  const product = useSelector((state) =>
    state.product.products.find((product) => product.id === id)
  );

  return (
    <div style={blockContainer}>
      <div style={nameStyle}>{product.name}</div>
      <div style={priceStyle}>{product.price}</div>
    </div>
  );
};

const blockContainer = {
  padding: "10px",
};
const nameStyle = {
  display: "inline-block",
  width: "70%",
  textAlign: "left",
};

const priceStyle = {
  display: "inline-block",
  marginLeft: "15px",
  textAlign: "right",
};

export default Item;
