import React from "react";

const Item = ({ name, price }) => {
  return (
    <div style={blockContainer}>
      <div style={nameStyle}>{name}</div>
      <div style={priceStyle}>{price}</div>
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
