import axios from "axios";
import { GET_BRANDS, BRAND_ADD } from "./types";

import { BRAND_SERVER, PRODUCT_SERVER } from "../components/utils/misc";

export function getBrands() {
  const request = axios
    .get(`${BRAND_SERVER}?sortBy=name`)
    .then(response => response.data);
  return {
    type: GET_BRANDS,
    payload: request
  };
}

export function BrandAdd(dataToSubmit) {
  const request = axios
    .post(`${PRODUCT_SERVER}/brand`, dataToSubmit)
    .then(response => response.data);
  return {
    type: BRAND_ADD,
    payload: request
  };
}
