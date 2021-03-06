import Navbr from "./components/Navbar";
import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Book from "./components/Book";
import Cart from "./components/Cart";
import Order from "./components/Order";
import Profile from "./components/Profile";
import AddBoook from "./components/AddBook";
import { Provider } from "react-redux";
import store from "./store";
import Authenticate from "./components/Authenticate";
import Footer from "./components/Footer";
import OrderSucc from "./components/OrderSucc";
export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbr />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/books" element={<Book />} />
            <Route path="/books/cart/:id" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addbook" element={<AddBoook />} />
            <Route path="/authenticate" element={<Authenticate />} />
            <Route path="/books/order" element={<Order />} />
            <Route path="/sucess" element={<OrderSucc />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}
