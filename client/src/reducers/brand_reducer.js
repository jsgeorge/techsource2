import { GET_BRANDS, BRAND_ADD } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_BRANDS:
      return { ...state, byName: action.payload };
    case BRAND_ADD:
      return { ...state, addSuccess: action.payload };
    default:
      return state;
  }
}
