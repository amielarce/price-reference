import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ItemSwiper from "./ItemSwiper";

import "react-tabs/style/react-tabs.css";
import "swiper/swiper-bundle.min.css";

const ItemList = () => {
  // Initialize states
  const [selectedTab, setSelectedTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  // Update state on tab select
  const onSelectTab = (index, lastIndex) => {
    setSelectedTab(index);
  };

  // Obtain product and category data from store
  const productData = useSelector((state) => state.product.products);
  const categoryData = useSelector((state) => state.category.categories);
  const searchText = useSelector((state) => state.search.text);

  useEffect(() => {
    const products = [];
    categoryData.forEach((category) => {
      const categoryItems = [];

      productData.forEach((product) => {
        var index = 0;
        if (searchText !== "") {
          index = product.name.toLowerCase().indexOf(searchText.toLowerCase());
        }
        const updatedCategory =
          category === "All" ? product.category : category;
        if (updatedCategory === product.category && index > -1) {
          categoryItems.push(<ItemSwiper key={product.id} id={product.id} />);
        }
      });

      if (categoryItems.length <= 0) {
        categoryItems.push(<div key={0}>Item not found.</div>);
      }

      products.push(<div>{categoryItems}</div>);
    });
    setProducts(products);

    // Create tabs once tab panel data is set
    if (productData.length > 0) {
      const categoryList = categoryData.map((category) => (
        <Tab key={category}>{category}</Tab>
      ));
      setCategoryList(categoryList);
    }
  }, [productData, categoryData, searchText]);

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
