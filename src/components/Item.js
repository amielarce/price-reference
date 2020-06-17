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
  width: "100%",
  textAlign: "left",
};
const nameStyle = {
  display: "inline",
  width: "70%",
};

const priceStyle = {
  display: "inline",
};

export default Item;
