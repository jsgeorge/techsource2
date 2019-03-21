import React, { Component } from "react";
import Promotions from "./promotions";
import Carousel from "./carousel";
import CardBlock from "./../utils/card_block";
import { connect } from "react-redux";
import {
  getProductsBySell,
  getProductsByArrival
} from "../../actions/product_actions";
class HomePage extends Component {
  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }
  render() {
    return (
      <div>
        <Carousel />
        <div className="container">
          <CardBlock list={this.props.products.bySell} title="Top Sellers" />
        </div>
        <Promotions />
        <div className="container">
          <CardBlock
            list={this.props.products.byArrival}
            title="New Arrivals"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};
export default connect(mapStateToProps)(HomePage);
