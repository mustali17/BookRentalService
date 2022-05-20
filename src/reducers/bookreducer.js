import { CREATE_BOOK } from "../constant/type";

const initialstate = {
  books: [
    {
      bookname: "Atomic Habits",
      author: "James Clear",
      desc: "An Easy & Proven Way to Build Good Habits & Break Bad Ones"
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
