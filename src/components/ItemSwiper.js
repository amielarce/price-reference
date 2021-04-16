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
        swiper: null
    }
  }

  handleItemUpdate() {
      this.state.swiper.slideNext(1000,true);
      this.state.swiper.update();
  }

  render() {
    return (
      <Swiper initialSlide={1} onSwiper={(swiper) => this.setState({swiper: swiper})}>
        <SwiperSlide>
          <ItemAction id={this.props.id} onItemUpdate={this.handleItemUpdate}/>
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

export default ItemSwiper;
