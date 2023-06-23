import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Checkout({ price, address, book }) {
  const handleCheckout = () => {
    console.log(book);
    axios
      .post("http://localhost:5000/api/stripe/create-checkout-session", {
        book,
        address,
        price: price,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <button type="submit" onClick={() => handleCheckout()}>
      Checkout
    </button>
  );
}
