import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Item from "./Item";
import ItemAction from "./ItemAction";

import "swiper/swiper-bundle.min.css";

export class ItemSwiper extends Component {
  constructor(props) {
    super(props);
    this.handleItemUpdate = this.handleItemUpdate.bind(this);

    this.state = {
      swiper: null,
    };
  }

  handleItemUpdate() {
    this.state.swiper.slideNext(1000, true);
    this.state.swiper.update();
  }

  render() {
    return (
      <Swiper
        initialSlide={1}
        style={swiperStyle}
        onSwiper={(swiper) => this.setState({ swiper: swiper })}
      >
        <SwiperSlide style={slideStyle}>
          <ItemAction
            id={this.props.id}
            name={this.props.name}
            price={this.props.price}
            category={this.props.category}
            onItemUpdate={this.handleItemUpdate}
            categories={this.props.categories}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Item
            key={this.props.id}
            name={this.props.name}
            price={this.props.price}
          />
        </SwiperSlide>
      </Swiper>
    );
  }
}

const swiperStyle = {
  borderBottom: "1px solid gray",
};

const slideStyle = {
  display: "flex",
  alignItems: "center",
};

export default ItemSwiper;
