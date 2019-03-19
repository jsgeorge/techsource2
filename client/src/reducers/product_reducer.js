import {
  GET_PRODUCTS,
  GET_PRODUCTS_BY_ID,
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  PRODUCT_ADD
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        toShop: action.payload.articles,
        toShopSize: action.payload.size
      };
    case GET_PRODUCTS_BY_ID:
      return {
        ...state,
        byId: action.payload
      };
    case GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: action.payload };
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };
    case PRODUCT_ADD:
      return { ...state, addSuccess: action.payload };
    default:
      return state;
  }
}
