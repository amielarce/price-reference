import React, { Component } from "react";
import { Tab, TabList } from "react-tabs";
import 'react-tabs/style/react-tabs.css';

export class Categories extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    const categoryList = this.props.list.map((category) => 
      <Tab key={category}>{category}</Tab>
    );
    return <TabList>{categoryList}</TabList>;
  }
}

export default Categories;
