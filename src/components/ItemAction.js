import React, { Component } from "react";
import { projectFirestore } from "../firebase/config";

export class Item extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
        projectFirestore.collection('products').doc(this.props.id).delete()
        .then(() => {
            // TODO: 
            console.log('Deleted');
        }).catch((error) => {
            console.error(error);
        });
    }
  render() {
    return (
      <div style={blockContainer}>
        <button>Edit</button>
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
}

const blockContainer = {
  borderBottom: "1px solid gray",
  padding: "10px",
  backgroundColor: "gray"
};

export default Item;
