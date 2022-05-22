import Navbar from "./components/Navbar";
import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Book from "./components/Book";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import AddBoook from "./components/AddBook";
import { Provider } from "react-redux";
import store from "./store";
export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/books" element={<Book />} />
            <Route path="/books/cart/:id" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addbook" element={<AddBoook />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
