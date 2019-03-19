import {
  USER_LOGIN,
  USER_REGISTER,
  USER_EDIT,
  AUTH_USER,
  USER_LOGOUT,
  USER_ADD_TO_CART,
  USER_DELETE_FROM_CART,
  USER_GET_CART_ITEMS,
  USER_BUY_SUCCESS
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        loginSuccess: action.payload
      };
    case USER_REGISTER:
      return {
        ...state,
        regSuccess: action.payload
      };
    case USER_EDIT:
      return {
        ...state,
        editSuccess: action.payload
      };
    case AUTH_USER:
      return {
        ...state,
        userData: action.payload
      };
    case USER_ADD_TO_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload
        }
      };
    case USER_DELETE_FROM_CART:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        userData: {
          ...state.userData,
          cart: action.payload.cart
        }
      };
    case USER_GET_CART_ITEMS:
      return {
        ...state,
        cartDetail: action.payload
      };
    case USER_BUY_SUCCESS:
      return {
        ...state,
        successBuy: action.payload.successBuy,
        userData: {
          ...state.userData,
          cart: action.payload.cart
        },
        cartDetail: action.payload.cartDetail
      };
    case USER_LOGOUT:
      return { ...state };
    default:
      return state;
  }
}
