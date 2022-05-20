import React from "react";

export default function Books({ book }) {
  const { bookname, author, desc } = book;
  return <h1>{bookname}</h1>;
}
