import axios from "axios";
import {
  GET_PRODUCTS,
  GET_PRODUCTS_BY_ID,
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  PRODUCT_ADD
} from "./types";

import { PRODUCT_SERVER } from "../components/utils/misc";

export function getProducts(skip, limit, filters = [], previousState = []) {
  const data = {
    limit,
    skip,
    filters
  };
  const request = axios.post(`${PRODUCT_SERVER}/shop`, data).then(response => {
    let newState = [...previousState, ...response.data.articles];

    return {
      size: response.data.size,
      articles: newState
    };
  });
  return {
    type: GET_PRODUCTS,
    payload: request
  };
}
export function getProductById(id, type) {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles_by_id?type=${type}&id=${id}`)
    .then(response => response.data);
  return {
    type: GET_PRODUCTS_BY_ID,
    payload: request
  };
}
export function getProductsBySell() {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(response => response.data);
  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: request
  };
}
export function getProductsByArrival() {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);
  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  };
}
export function ProductAdd(dataToSubmit) {
  const request = axios
    .post(`${PRODUCT_SERVER}/article`, dataToSubmit)
    .then(response => response.data);
  return {
    type: PRODUCT_ADD,
    payload: request
  };
}
