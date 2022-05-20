import React from "react";

export default function Books({ book }) {
  const { bookname, author, desc } = book;
  return (
    <>
      <h3>Book Name:{bookname}</h3>
      <h3>Author Name:{author}</h3>
      <h3>Description:{desc}</h3>
    </>
  );
}
