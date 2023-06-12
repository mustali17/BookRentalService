import React, { useState } from "react";

const Testimonials = () => {
  const [myStyle, setMyStyle] = useState({
    // background: "rgb(5 182 195)",
    color: "black",
  });

  return (
    <div className="container-fluid px-0" style={{ ...myStyle }}>
      <div
        id="carouselExampleIndicators"
        className="carousel slide position-relative"
        data-bs-ride="true"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active mt-5"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
            className="mt-5"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
            className="mt-5"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="text-center">
              <img
                src="https://media.istockphoto.com/id/1309257039/photo/portrait-of-young-male-student-holding-book-standing-isolated-over-white-background-stock.jpg?s=612x612&w=0&k=20&c=Irreqj9k8XvGIP-k_72EgH_lZmyOQTugOq9I-zrUfK4="
                alt=""
                className="mt-5"
                style={{
                  width: "calc(10rem + 10vw)",
                  height: "20%",
                  borderRadius: "20px",
                }}
              />
              <p
                className="my-5"
                style={{
                  position: "relative",
                  margin: "0 1vw",
                  fontSize: "calc(.9rem + .7vw)",
                  padding: "0 calc(1rem + 6vw)",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                "As a busy college student, Rent and Read has been a lifesaver.
                I can now read all the books I want without breaking the bank.
                Thank you!"
                <br />
                <span
                  style={{
                    fontSize: "calc(.8rem + .7vw)",
                    fontStyle: "italic",
                  }}
                  className="auser"
                >
                  - Jane Doe
                </span>
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <div className="text-center">
              <img
                src="https://media.istockphoto.com/id/1448115775/photo/portrait-of-a-young-man-holding-a-book-in-a-library.jpg?s=612x612&w=0&k=20&c=OlNAVDVuc0EmV2y1jp8yxZHFD8_xrhv1X7YOU6Vlsmw="
                alt=""
                className="mt-5"
                style={{ width: "calc(10rem + 10vw)", borderRadius: "20px" }}
              />
              <p
                className="my-5"
                style={{
                  position: "relative",
                  margin: "0 1vw",
                  fontSize: "calc(.9rem + .7vw)",
                  padding: "0 calc(1rem + 6vw)",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                "I recently rented a book from Rent and Read and I was blown
                away by the selection and ease of the process. I would highly
                recommend this service to any book lover!"
                <br />
                <span
                  style={{
                    fontSize: "calc(.8rem + .7vw)",
                    fontStyle: "italic",
                  }}
                  className="auser"
                >
                  - John Smith
                </span>
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <div className="text-center">
              <img
                src="https://media.istockphoto.com/id/1425529463/photo/portrait-of-east-asian-student-with-books-and-backpack-in-college.jpg?s=612x612&w=0&k=20&c=cSspiaM-TzyEm8hrwVePu-yd7w4k1j4omPF9p-yS1iU="
                alt=""
                className="mt-5"
                style={{ width: "calc(10rem + 10vw)", borderRadius: "20px" }}
              />
              <p
                className="my-5"
                style={{
                  position: "relative",
                  margin: "0 1vw",
                  fontSize: "calc(.9rem + .7vw)",
                  padding: "0 calc(1rem + 6vw)",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                "I love the convenience of being able to rent books from the
                comfort of my own home. Rent and Read has made it so easy to
                access the books I want to read."
                <br />
                <span
                  style={{
                    fontSize: "calc(.8rem + .7vw)",
                    fontStyle: "italic",
                  }}
                  className="auser"
                >
                  - Jane Lee
                </span>
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
