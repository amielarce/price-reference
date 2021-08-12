import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ItemSwiper from "./ItemSwiper";

import "react-tabs/style/react-tabs.css";
import "swiper/swiper-bundle.min.css";

const ItemList = ({searchItem}) => {
  // Initialize states
  const [selectedTab, setSelectedTab] = useState(0);

  // Update state on tab select
  const onSelectTab = (index, lastIndex) => {
    setSelectedTab(index);
  };

  // Obtain product and category data from store
  const productData = useSelector((state) => state.product.products);
  const categoryData = useSelector((state) => state.category.categories);

  const products = [];
  categoryData.forEach((category) => {
    const categoryItems = [];

    productData.forEach((product) => {
      const index = product.name
        .toLowerCase()
        .indexOf(searchItem.toLowerCase());
      const updatedCategory = category === "All" ? product.category : category;
      if (updatedCategory === product.category && index > -1) {
        categoryItems.push(
          <ItemSwiper
            key={product.id}
            id={product.id}
          />
        );
      }
    });

    if (categoryItems.length <= 0) {
      categoryItems.push(<div key={0}>Item not found.</div>);
    }

    products.push(<div>{categoryItems}</div>);
  });

  const categoryList = categoryData.map((category) => (
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
