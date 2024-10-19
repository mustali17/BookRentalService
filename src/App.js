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
import Authenticate from "./components/Authenticate";
import Footer from "./components/Footer";
import OrderSucc from "./components/OrderSucc";
import SignUp from "./components/Signup";
import Signin from "./components/Signin";
import Logout from "./components/Logout";
import MyOrder from "./components/MyOrder";
import AllOrders from "./components/AllOrders";
import TryTapop from "./components/TryTapop";
import Username from "./components/Username";
import Admin from "./components/Admin";
import AdminPage from "./components/AdminPage";
import AllUsers from "./components/AllUsers";
import RequestBook from "./components/RequestBook";
import BookRequest from "./components/BookRequest";
import EBooks from "./components/EBooks";
import Checkout from "./components/Checkout";
import PaymentCancelled from "./components/PaymentCancelled";

// import BookRecommendations from "./components/BookRecommendations";
export default function App() {
  return (
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
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/books/order/:id" element={<Order />} />
          <Route path="/sucess" element={<OrderSucc />} />
          <Route path="/books" element={<Book />} />
          <Route path="/addbook" element={<AddBoook />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/myorder" element={<MyOrder />} />
          <Route path="/allorders" element={<AllOrders />} />
          <Route path="/try" element={<TryTapop />} />
          <Route path="/username" element={<Username />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/admin/all-users" element={<AllUsers />} />
          <Route path="/requestbook" element={<RequestBook />} />
          <Route path="/admin/book-request" element={<BookRequest />} />
          <Route path="/ebooks" element={<EBooks />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-cancelled" element={<PaymentCancelled />} />
          <Route path="/:id/cancelled" element={<PaymentCancelled />} />
          {/* <Route path="/recomedbook" element={<BookRecommendations />} /> */}
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
