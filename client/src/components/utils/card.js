import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AddToCart } from "../../actions/user_actions";
import { withRouter } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faShoppingBag from "@fortawesome/fontawesome-free-solid/faShoppingBag";

class Card extends Component {
  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_availble.png";
    }
  }
  render() {
    const props = this.props;
    return (
      <div>
        <Link to={`products/${props.name}/${props._id}`}>
          <div
            className="image"
            style={{
              background: `url(${this.renderCardImage(props.images)}) no-repeat`
            }}
          />
        </Link>
        <div className="action_container">
          <div className="tags">
            <div className="prod_info">
              <div className="brand">{props.brand.name}</div>
              <div className="name">{props.name}</div>
              <div className="price">${props.price}</div>
            </div>
            <div className="actions">
              <div className="button_wrapp">
                <Link
                  className="card_link"
                  to={`products/${props.name}/${props._id}`}
                >
                  View More
                </Link>
              </div>
              <div className="button_wrapp">
                <button
                  className="bag_link"
                  onClick={() => {
                    props.user.userData.isAuth
                      ? this.props
                          .dispatch(AddToCart(props._id))
                          .then(response => {
                            this.props.history.push("/shop/cart");
                          })
                      : this.props.history.push("/login");
                  }}
                >
                  <FontAwesomeIcon icon={faShoppingBag} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(withRouter(Card));
