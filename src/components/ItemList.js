import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ItemSwiper from "./ItemSwiper";

import "react-tabs/style/react-tabs.css";
import "swiper/swiper-bundle.min.css";

const ItemList = (props) => {
  // Initialize states
  const [selectedTab, setSelectedTab] = useState(0);

  // Update state on tab select
  const onSelectTab = (index, lastIndex) => {
    setSelectedTab(index);
  };

  // Render
  const products = [];
  props.categories.forEach((category) => {
    const categoryItems = [];

    props.products.forEach((product) => {
      const index = product.name
        .toLowerCase()
        .indexOf(props.searchItem.toLowerCase());
      const updatedCategory = category === "All" ? product.category : category;
      if (updatedCategory === product.category && index > -1) {
        categoryItems.push(
          <ItemSwiper
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
            categories={props.categories}
          />
        );
      }
    });

    if (categoryItems.length <= 0) {
      categoryItems.push(<div key={0}>Item not found.</div>);
    }

    products.push(<div>{categoryItems}</div>);
  });

  const categoryList = props.categories.map((category) => (
    <Tab key={category}>{category}</Tab>
  ));

  return (
    <Tabs selectedIndex={selectedTab} onSelect={onSelectTab}>
      <TabList style={scrollMenu}>{categoryList}</TabList>
      {products.map((product, index) => (
        <TabPanel style={tabBody} key={index}>
          {product}
        </TabPanel>
      ))}
    </Tabs>
  );
};

const scrollMenu = {
  overflow: "auto",
  whiteSpace: "nowrap",
};

const tabBody = {
  margin: "5px",
};

export default ItemList;
