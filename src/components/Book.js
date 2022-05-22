import React from "react";
import { useSelector } from "react-redux";
import Books from "./Books";
export default function Book() {
  const books = useSelector((state) => state.book.books);

  return (
    <>
      <h3 style={{ textAlign: "center" }}>View Books:</h3>

      <div className="container">
        <div class="row row-cols-1 row-cols-md-3 g-4">
          {books.map((book) => {
            return <Books book={book} key={book.id} />;
          })}
        </div>
      </div>
    </>
  );
}
