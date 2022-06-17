import { CART_BOOK, CREATE_BOOK, GET_BOOK } from "../constant/type";

export const addBook = (book) => {
  return {
    type: CREATE_BOOK,
    payload: book
  };
};

export const getBook = (id) => {
  return {
    type: GET_BOOK,
    payload: id
  };
};

export const cartBook = (book) => {
  return {
    type: CART_BOOK,
    payload: book
  };
};
