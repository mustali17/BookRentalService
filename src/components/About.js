import React from "react";
import AdsComponent from "./AdsComponent";

export default function About() {
  const notify = () => {
    toast.success("Wow so easy!");
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <h2>About Company Page</h2>
            <br />
            <h4>
              Welcome to our book rental service! Our mission is to make reading
              more accessible and affordable for everyone. We believe that
              knowledge should be accessible to all, and that’s why we started
              this service.
            </h4>
            <br />
            <p>
            We are college students in our third year of studies. We've always been passionate about reading, but we know how expensive it can be to buy books. That's why we started this website, to help others like us who love reading but can't always afford to buy new books. Our website offers a wide selection of books for rent, from classic literature to contemporary bestsellers. We believe that reading is not just a hobby, but a way to expand our minds and explore new ideas. By renting books from us, you can save money and still enjoy the pleasure of reading.
            </p>
            <br />
            <p>
              We also offer flexible rental options to fit your schedule and
              budget. You can rent a book for as little as a week or as long as
              a month. And if you decide you want to keep the book, we offer the
              option to purchase it at a discounted price. At our book rental
              service, we’re dedicated to providing the best possible experience
              for our customers. We’re constantly adding new titles to our
              collection and improving our website to make it easier for you to
              find the books you want. Thank you for choosing our service, and
              happy reading!
            </p>
            <br />
            <button className="btn btn-primary">Get in Touch</button>
            <div></div>
            <br />
            <br />
          </div>
          <div className="col-sm-4 d-flex justify-content-end">
            <div
              id="sideimage"
              style={{
                perspective: "800px",
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src={require("../2672335-removebg-preview.png")}
                alt="..."
                style={{
                  maxWidth: "100%",
                  minWidth: "70px",
                  height: "auto",
                  transform: "rotateY(-20deg)",
                  filter: "drop-shadow(8px 5px 4px #303030)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
