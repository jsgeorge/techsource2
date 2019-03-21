import React, { Component } from "react";
import LayoutAdmin from "../../hoc/adminLayout";
import CartBlock from "../utils/cart_block";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Paypal from "../utils/paypal";

import {
  GetCartItems,
  DeleteFromCart,
  UserBuySuccess
} from "../../actions/user_actions";

class Cart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  };
  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;
    this.setState({ showSuccess: false });
    if (user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
        this.props
          .dispatch(GetCartItems(cartItems, user.userData.cart))
          .then(() => {
            if (this.props.user.cartDetail.length > 0) {
              this.calculateTotal(this.props.user.cartDetail);
            }
          });
      }
    }
  }
  calculateTotal = detail => {
    let total = 0;
    detail.forEach(item => {
      let totalPrice = item.quantity * parseInt(item.price, 10);
      total += totalPrice;
    });
    this.setState({ showTotal: true, total: total });
  };

  removeFromCart = id => {
    this.props.dispatch(DeleteFromCart(id)).then(() => {
      if (this.props.user.cartDetail.length == 0) {
        this.setState({
          showTotal: false
        });
      } else {
        this.calculateTotal(this.props.user.cartDetail);
      }
    });
  };

  transactionError = data => {};
  transactionCanceled = data => {};
  transactionSuccess = data => {
    this.props
      .dispatch(
        UserBuySuccess({
          cartDetail: this.props.user.cartDetail,
          paymentData: data
        })
      )
      .then(() => {
        if (this.props.user.successBuy) {
          this.setState({
            showTotal: false,
            showSuccess: true
          });
        }
      });
  };

  // paypalHandler = () => {
  //   this.props
  //     .dispatch(
  //       UserBuySuccess({
  //         cartDetail: this.props.user.cartDetail
  //       })
  //     )
  //     .then(() => {
  //       if (this.props.user.successBuy) {
  //         this.setState({ showTotal: false, total: 0, showSuccess: true });
  //       }
  //     });
  // };

  render() {
    const cartProducts = this.props.products.cartDetail;
    const user = this.props.user.userData;
    return (
      <LayoutAdmin>
        <h3>
          My Cart
          {/* <table>
              <tr>
                <th>Item</th>
                <th>qty</th>
              </tr>
              <tr>
                <td> {this.props.user.userData.cart[0].id}</td>
                <td> {this.props.user.userData.cart[0].qty}</td>
              </tr>
              <tr>
                <td> {this.props.user.userData.cart[1].id}</td>
                <td> {this.props.user.userData.cart[2].qty}</td>
              </tr>
            </table> */}
        </h3>
        <div className="container">
          <div>
            {/* <CartBlock cart={this.props.user.userData.cart} /> */}
            {this.state.total == 0 ? (
              <div>No items in cart</div>
            ) : (
              <div>
                <CartBlock
                  products={this.props.user}
                  type="cart"
                  removeItem={id => this.removeFromCart(id)}
                />
              </div>
            )}
            {this.state.showTotal && this.state.total > 0 ? (
              <div className="user_cart_sum">Total $ {this.state.total}</div>
            ) : null}
            {this.state.showTotal ? (
              <div className="paypal_button_container">
                {/* <button
                  className="btnPaypal"
                  onClick={() => this.paypalHandler()}
                  style={{ color: "#fff" }}
                >
                  Checkout
                </button> */}
                <Paypal
                  toPay={this.state.total}
                  transactionError={data => this.transactionError(data)}
                  transactionCanceled={data => this.transactionCanceled(data)}
                  onSuccess={data => this.transactionSuccess(data)}
                />
              </div>
            ) : null}
            {this.state.showSuccess ? (
              <div className="show_success">
                THank you. Your order has been processed Successfully
              </div>
            ) : null}
          </div>
        </div>
      </LayoutAdmin>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    products: state.products
  };
};

export default connect(mapStateToProps)(withRouter(Cart));
