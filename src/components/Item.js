import React, { Component } from "react";

export class Item extends Component {
  render() {
    return (
      <div style={blockContainer}>
        <div style={nameStyle}>{this.props.name}</div>
        <div style={priceStyle}>{this.props.price}</div>
      </div>
    );
  }
}

const blockContainer = {
  borderBottom: "1px solid gray",
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
