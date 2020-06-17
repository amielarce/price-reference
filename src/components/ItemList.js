import React, { Component } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Item from "./Item";
import "react-tabs/style/react-tabs.css";

export class ItemList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const products = [];
    this.props.categories.forEach((category) => {
      const categoryItems = [];
      this.props.products.forEach((product) => {
        const index = product.name.toLowerCase().indexOf(this.props.searchItem.toLowerCase());
        console.log("index is: " + index);
        if (category === product.category && index > -1) {
          categoryItems.push(
            <Item key={product.id} name={product.name} price={product.price} />
          );
        }
      });
      products.push(<div>{categoryItems}</div>);
      console.log(products);
    });

    const categoryList = this.props.categories.map((category) => (
      <Tab key={category}>{category}</Tab>
    ));

    return (
      <Tabs>
        <TabList>{categoryList}</TabList>
        {products.map((product, index) => (
          <TabPanel key={index}>{product}</TabPanel>
        ))}
      </Tabs>
    );
  }
}

export default ItemList;
