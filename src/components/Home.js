import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="container text-center">
        <div>
          <h1>Books on Rent</h1>
          <h3>Books on your doorstep</h3>
          <Link to="/books">
            <button type="button" className="btn btn-outline-primary">
              Rent Books
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
