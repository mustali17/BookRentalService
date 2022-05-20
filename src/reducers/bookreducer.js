import { CREATE_BOOK } from "../constant/type";

const initialstate = {
  books: [
    {
      bookname: "Mustali",
      author: "abcd",
      desc: "xyz"
    }
  ]
};

export const bookReducer = (state = initialstate, action) => {
  switch (action.type) {
    case CREATE_BOOK:
      return {
        ...state,
        books: [action.payload, ...state.books]
      };

    default:
      return state;
  }
};
