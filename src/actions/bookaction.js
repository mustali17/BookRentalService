import { CREATE_BOOK } from "../constant/type";

export const addBook = (book) => {
  return {
    type: CREATE_BOOK,
    payload: book
  };
};
