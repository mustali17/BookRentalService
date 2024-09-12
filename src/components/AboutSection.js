import React from "react";

export default function AboutSection() {
  const textColor = {
    color: "white",
  };

  return (
    <div>
      <div className="container py-4">
        <div className="row py-4">
          <div
            className="col-md-6 align-items-center d-flex"
            style={{ padding: "0 calc(2.5rem)" }}
          >
            <div>
              <h3 style={textColor}>The college community is here to help</h3>
              <p className="mt-4 fs-5 opacity-75" style={textColor}>
                Be a part of a sharing college community which helps each other
                through books.
              </p>
            </div>
          </div>
          <div
            className="col-md-6"
            id="sideimage"
            style={{
              perspective: "800px",
              transformStyle: "preserve-3d",
              padding: "0 2.5vw",
            }}
          >
            <img
              src={require("../5836-removebg-preview.png")}
              alt=""
              style={{
                width: "100%",
                height: "20rem",
                height: "auto",
                transform: "rotateY(20deg)",
                filter: "drop-shadow(8px 5px 4px #303030)",
              }}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row py-4">
          <div
            className="col-md-6"
            id="sideimage"
            style={{
              perspective: "800px",
              transformStyle: "preserve-3d",
              padding: "0 2.5vw",
            }}
          >
            <img
              src={require("../20945184-removebg-preview.png")}
              alt=""
              style={{
                width: "100%",
                height: "20rem",
                height: "auto",
                transform: "rotateY(20deg)",
                filter: "drop-shadow(8px 5px 4px #303030)",
              }}
            />
          </div>
          <div
            className="col-md-6 order-first order-md-last align-items-center d-flex justify-content-end"
            style={{ padding: "0 calc(2.5rem)" }}
          >
            <div>
              <h3 style={textColor}>A decentralized library for everyone</h3>
              <p className="mt-4 fs-5 opacity-75" style={textColor}>
                Find your favorite books from the comfort of your home while
                spending very little money.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container pb-4">
        <div className="row py-4">
          <div
            className="col-md-6 align-items-center d-flex"
            style={{ padding: "0 calc(2.5rem)" }}
          >
            <div>
              <h3 style={textColor}>Join and help others like you</h3>
              <p className="mt-4 fs-5 opacity-75" style={textColor}>
                Come on and create an account to join us so you can also serve
                as a part of this initiative.
              </p>
            </div>
          </div>
          <div
            className="col-md-6"
            id="sideimage"
            style={{
              perspective: "800px",
              transformStyle: "preserve-3d",
              padding: "0 2.5vw",
            }}
          >
            <img
              src={require("../5278-removebg-preview.png")}
              alt=""
              style={{
                width: "100%",
                height: "20rem",
                height: "auto",
                transform: "rotateY(20deg)",
                filter: "drop-shadow(8px 5px 4px #303030)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
