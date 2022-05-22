import { CART_BOOK, CREATE_BOOK, GET_BOOK } from "../constant/type";

const initialstate = {
  books: [
    {
      id: 1,
      bookname: "Atomic Habits ",
      author: "James Clear",
      desc:
        "Packed with evidence-based strategies, Atomic Habits will teach you how to make small changes that will transform your habits and deliver amazing results.",
      price: "100",
      imgurl:
        "https://therightbookstoreindia.com/wp-content/uploads/2021/09/1632735326.jpg"
    },
    {
      id: 2,
      bookname: "Ikigai ",
      author: "Francesc Miralles",
      desc:
        "According to the Japanese, everyone has an ikigai—a reason for living. And according to the residents of the Japanese village with the world’s longest-living people, finding it is the key to a happier and longer life.",
      price: "100",
      imgurl:
        "https://www.ajayonlinestall.com/wp-content/uploads/2021/02/9781786330895.png"
    },
    {
      id: 5,
      bookname: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      desc:
        " A Brief History of Humankind is a book by Yuval Noah Harari, first published in Hebrew in Israel in 2011 based on a series of lectures Harari taught at The Hebrew University of Jerusalem, and in English in 2015.",
      price: "100",
      imgurl: "https://www.ynharari.com/wp-content/uploads/2017/01/sapiens.png"
    },
    {
      id: 3,
      bookname: "Rich Dad Poor Dad ",
      author: "Robert Kiyosaki",
      desc:
        "It advocates the importance of financial literacy, financial independence and building wealth through investing in assets, real estate investing, starting and owning businesses, as well as increasing one's financial intelligence.",
      price: "100",
      imgurl:
        "https://www.cyberkart.in/wp-content/uploads/2019/11/Rich-Dad-Poor-Dad-Front.jpg"
    },
    {
      id: 4,
      bookname: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      desc:
        "It’s the self-help book for people who hate self-help. It’s as much a pat on the back as a slap in the face. It’s the first truly no BS guide to flourishing in a crazy, crazy world.",
      price: "100",
      imgurl: "https://eshfamart.com/wp-content/uploads/2021/09/002-1-3.jpg"
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
