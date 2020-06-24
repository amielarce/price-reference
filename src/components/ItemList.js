import React, { Component } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Item from "./Item";
import "react-tabs/style/react-tabs.css";

export class ItemList extends Component {
  constructor(props) {
    super(props);
    this.onSelectTab = this.onSelectTab.bind(this);
    this.state = {selectedTab: 0};
  }

  onSelectTab(index, lastIndex) {
    this.setState({selectedTab: index});
  }

  render() {
    const products = [];
    this.props.categories.forEach((category) => {
      const categoryItems = [];

      this.props.products.forEach((product) => {
        const index = product.name
          .toLowerCase()
          .indexOf(this.props.searchItem.toLowerCase());
        const updatedCategory =
          category === "All" ? product.category : category;
        if (updatedCategory === product.category && index > -1) {
          categoryItems.push(
            <Item key={product.id} name={product.name} price={product.price} />
          );
        }
      });

      if (categoryItems.length <= 0) {
        categoryItems.push(<div>Item not found.</div>);
      }

      products.push(<div>{categoryItems}</div>);
      console.log(products);
    });

    const categoryList = this.props.categories.map((category) => (
      <Tab key={category}>{category}</Tab>
    ));

    return (
      <Tabs selectedIndex={this.state.selectedTab} onSelect={this.onSelectTab}>
        <TabList style={scrollMenu}>{categoryList}</TabList>
        {products.map((product, index) => (
          <TabPanel style={tabBody} key={index}>{product}</TabPanel>
        ))}
      </Tabs>
    );
  }
}

const scrollMenu = {
  overflow: "auto",
  whiteSpace: "nowrap"
}

const tabBody = {
  margin: "5px"
}

export default ItemList;
