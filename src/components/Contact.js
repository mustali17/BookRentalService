import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../5127314-removebg-preview.png";

export default function Contact() {
  function handleSubmit(e) {
    e.preventDefault();
    toast.success("Thanks for contacting us!");
  }
  return (
    <div>
      <head>
        <link
          rel="stylesheet"
          to="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <div className="container" style={{ padding: "5px" }}>
        <section className="mb-4">
          <h2 className="h1-responsive font-weight-bold text-center my-4">
            Contact us!
          </h2>
          <p className="text-center w-responsive mx-auto mb-5">
            Do you have any questions? Please do not hesitate to contact us
            directly. Our team will come back to you within a matter of hours to
            help you.
          </p>
          <div className="row">
            <div className="col-md-6">
              <div
                id="sideimage"
                style={{
                  perspective: "800px",
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  src={image}
                  alt="Contact"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    transform: "rotateY(20deg)",
                    filter: "drop-shadow(8px 5px 4px #303030)",
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <form id="contact-form" name="contact-form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="md-form mb-0">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                      />
                      <label htmlFor="name" className="">
                        Your name
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="md-form mb-0">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        className="form-control"
                      />
                      <label htmlFor="email" className="">
                        Your email
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="md-form mb-0">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="form-control"
                      />
                      <label htmlFor="subject" className="">
                        Subject
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="md-form">
                      <textarea
                        type="text"
                        id="message"
                        name="message"
                        rows="2"
                        className="form-control md-textarea"
                      ></textarea>
                      <label htmlFor="message">Your message</label>
                    </div>
                  </div>
                </div>

                <div className="text-center text-md-left">
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
                <div className="status"></div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
}
