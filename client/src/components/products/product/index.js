import React, { Component } from "react";
import { connect } from "react-redux";
import { getProductById } from "../../../actions/product_actions";
import { Link, withRouter } from "react-router-dom";
import ProductImage from "./image";
import ProductDetail from "./detail";
import { AddToCart } from "../../../actions/user_actions";

class Product extends Component {
  componentDidMount() {
    const userId = this.props.user.userData._id;
    const prodId = this.props.match.params.id;
    const ProductName = this.props.match.params.name;
    this.props.dispatch(getProductById(prodId, "single"));
  }
  addToCartHandler(id) {
    this.props.user.userData.isAuth
      ? this.props.dispatch(AddToCart(id)).then(response => {
          this.props.history.push("/shop/cart");
        })
      : this.props.history.push("/login");
  }
  render() {
    const detail = this.props.products.byId;
    return (
      <div className="page_wrapper">
        <div className="page_top">
          <div className="container">
            <Link to={"/shop/products"}>Shop</Link> / View Product
          </div>{" "}
        </div>
        <div className="container">
          {this.props.products.byId
            ? this.props.products.byId.map(product => (
                <div className="product_detail_wrapper">
                  <div className="product_image_container">
                    <ProductImage product={product} />
                  </div>
                  <div className="right">
                    <ProductDetail
                      addToCart={id => this.addToCartHandler(id)}
                      product={product}
                    />
                  </div>
                </div>
              ))
            : "Loading"}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user
  };
};
export default connect(mapStateToProps)(withRouter(Product));
