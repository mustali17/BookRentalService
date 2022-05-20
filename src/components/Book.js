import React from "react";
import { useSelector } from "react-redux";
import Books from "./Books";
export default function Book() {
  const books = useSelector((state) => state.book.books);

  return (
    <>
      <h1>Books:</h1>
      {books.map((book) => {
        return <Books book={book} />;
      })}
    </>
  );
}
