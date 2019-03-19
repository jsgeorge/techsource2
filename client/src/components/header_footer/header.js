import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link, withRouter } from "react-router-dom";
//import { connect } from "react-redux";
//import { UserLogout } from "../../actions/user_actions";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

class Header extends Component {
  state = {
    open: false,
    page2: [
      {
        name: "Home",
        linkTo: "/",
        public: true
      },
      {
        name: "Electronics",
        linkTo: "/shop/products",
        public: true
      }
    ],
    user: [
      {
        name: "Cart",
        linkTo: "/shop/cart",
        public: false
      },
      {
        name: "Account",
        linkTo: "/user/dashboard",
        public: false
      },
      {
        name: "Log in",
        linkTo: "/login",
        public: true
      },
      {
        name: "Log out",
        linkTo: "/user/logout",
        public: false
      }
    ]
  };

  componentDidMount() {
    if (this.props.initState) {
      this.setState({ open: this.props.initState });
    }
  }
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleBars = () =>
    this.state.open ? (
      <FontAwesomeIcon icon={faBars} className="icon" />
    ) : (
      <FontAwesomeIcon icon={faBars} className="icon" />
    );
  logoutHandler = () => {
    // this.props.dispatch(UserLogout()).then(response => {
    //   if (response.payload.success) {
    //     this.props.history.push("/");
    //   }
    // });
  };

  defaultLink = (item, i) =>
    item.name === "Log out" ? (
      <div
        className="log_out_link"
        key={i}
        onClick={() => this.logoutHandler()}
      >
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    );
  mobileLink = (item, i) => (
    // item.name === "Log out" ? (
    //   <ListItem
    //     style={{
    //       background: "transparent",
    //       color: "#fff",
    //       padding: "15px 0",
    //       borderBottom: "1px solid #555"
    //     }}
    //     key={i}
    //     className="log_out_link"
    //     key={i}
    //     onClick={() => this.logoutHandler()}
    //   >
    //     Log Out
    //   </ListItem>
    // ) : (
    <ListItem
      key={i}
      style={{
        background: "transparent",
        color: "#fff",
        padding: "15px 0",
        borderBottom: "1px solid #555"
      }}
    >
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    </ListItem>
  );
  // );
  showLinks = (type, isMobile) => {
    let list = [];

    // if (this.props.user.userData) {
    //   type.forEach(item => {
    //     if (!this.props.user.userData.isAuth) {
    //       if (item.public === true) {
    //         list.push(item);
    //       }
    //     } else {
    //       if (item.name !== "Log in") {
    //         list.push(item);
    //       }
    //     }
    //   });
    // }
    type.forEach(item => {
      list.push(item);
    });

    return list.map((item, i) => {
      //if (item.name !== "My Cart") {
      if (!isMobile) return this.defaultLink(item, i);
      else return this.mobileLink(item, i);
      // } else {
      //   return this.cartLink(item, i);
      // }
    });
  };

  render() {
    return (
      <div>
        <header>
          <AppBar
            position="fixed"
            style={{
              backgroundColor: "#111",
              boxShadow: "none",
              padding: "10px 0px",
              borderBottom: "1px solid #aaa",
              color: "#fff"
            }}
          >
            <Toolbar>
              <div className="container">
                <div className="left">
                  <div className="logo">
                    <Link to="/">
                      TECH<span className="alt">SOURCE</span>
                    </Link>
                  </div>
                </div>{" "}
                <div className="mobileNav right mobile">
                  {/* <i class="fa fa-bars btnMenu" aria-hidden="true" /> */}
                  <List style={{ padding: "0", width: "100px" }}>
                    <ListItem
                      onClick={this.handleClick}
                      style={{ width: "100px" }}
                    >
                      {this.handleBars()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                      <List
                        component="div"
                        style={{ background: "transparent", padding: "0" }}
                      >
                        {this.showLinks(this.state.page2, true)}
                        {this.showLinks(this.state.user, true)}
                      </List>
                    </Collapse>
                  </List>
                </div>
                <div className="right dektop tablet">
                  <div className="top">
                    {this.showLinks(this.state.user, false)}
                  </div>
                  <div className="bottom desktop desktopLinks">
                    {this.showLinks(this.state.page2, false)}
                  </div>
                </div>
              </div>
            </Toolbar>
          </AppBar>
        </header>
      </div>
    );
  }
}

export default withRouter(Header);
