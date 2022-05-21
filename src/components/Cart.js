import React from "react";
import "../styles1.css";
import { useSelector } from "react-redux";
import Carts from "./Carts";

export default function Cart() {
  const books = useSelector((state) => state.book.books);
  return (
    <>
      <body
        style={{
          display: "flex",
          margin: "0",
          margin: "0",
          padding: "0",
          background: "linear-gradient(to bottom right, #E3F0FF, #FAFCFF)",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div className="CartContainer">
          <div className="Header">
            <h3 className="Heading">Shopping Cart</h3>
            <h5 className="Action">Remove all</h5>
          </div>
          {books.map((book) => {
            return <Carts book={book} key={book.id} />;
          })}

          <hr />
          <div className="checkout">
            <div className="total">
              <div>
                <div className="Subtotal">Sub-Total</div>
                <div className="items">2 items</div>
              </div>
              <div className="total-amount">$6.18</div>
            </div>
            <button className="button">Checkout</button>
          </div>
        </div>
      </body>
    </>
  );
}
