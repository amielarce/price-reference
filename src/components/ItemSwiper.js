import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Item from "./Item";
import ItemAction from "./ItemAction";

import "swiper/swiper-bundle.min.css";

export const ItemSwiper = (props) => {
  // Initialize states
  const [swiper, setSwiper] = useState(null);

  // Automate swiper movement once item is updated
  const handleItemUpdate = () => {
    swiper.slideNext(1000, true);
    swiper.update();
  };

  return (
    <Swiper
      initialSlide={1}
      style={swiperStyle}
      onSwiper={(swiper) => setSwiper(swiper)}
    >
      <SwiperSlide style={slideStyle}>
        <ItemAction
          id={props.id}
          name={props.name}
          price={props.price}
          category={props.category}
          onItemUpdate={handleItemUpdate}
          categories={props.categories}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Item key={props.id} name={props.name} price={props.price} />
      </SwiperSlide>
    </Swiper>
  );
};

const swiperStyle = {
  borderBottom: "1px solid gray",
};

const slideStyle = {
  display: "flex",
  alignItems: "center",
};

export default ItemSwiper;
