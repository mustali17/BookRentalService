import { CART_BOOK, CREATE_BOOK, GET_BOOK } from "../constant/type";

const initialstate = {
  books: [
    {
      id: 1,
      bookname: "Atomic Habits ",
      author: "James Clear",
      desc: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      price: "100",
      imgurl:
        "https://therightbookstoreindia.com/wp-content/uploads/2021/09/1632735326.jpg"
    },
    {
      id: 2,
      bookname: "Ikigai ",
      author: "James Clear",
      desc: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      price: "100",
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
    case GET_BOOK:
      let arr = state.books.filter((book) => book.id == action.payload);

      arr = arr.values();
      for (let val of arr) {
        arr = val;
      }
      return {
        ...state,
        book: arr
      };
    case CART_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id == action.payload.id ? action.payload : book
        )
      };

    default:
      return state;
  }
};
