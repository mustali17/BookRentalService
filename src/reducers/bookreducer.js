import { CREATE_BOOK } from "../constant/type";

const initialstate = {
  books: [
    {
      id: 1,
      bookname: "Atomic ",
      author: "James Clear",
      desc: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      price: "100/-",
      imgurl:
        "https://therightbookstoreindia.com/wp-content/uploads/2021/09/1632735326.jpg"
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
