import { combineReducers } from "redux";
import user from "./user_reducer";
import products from "./product_reducer";
import brands from "./brand_reducer";
import categories from "./category_reducer";
const rootReducer = combineReducers({
  user,
  products,
  brands,
  categories
});
export default rootReducer;
