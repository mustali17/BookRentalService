import React from "react";
import { Link } from "react-router-dom";


export default function OrderSucc() {
  return (
    <>
      <div
        className="container card border-info shadow text-center"
        style={{ maxWidth: "25rem", minWidth: "10rem" }}
      >
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto"
          }}
        >
          <l className="checkmark">✓</l>
        </div>
        <p1>Success</p1>
        <p><h5>
          We received your purchase request;
          <br /> we'll be in touch shortly!</h5>
          <br /><h6>Check Profile section to know your order status.</h6>
          <Link to="/profile">
            <button type="button" className="btn btn-outline-primary">
              My Profile
            </button>
          </Link>
          <br />
          <br/>
        </p>
      </div>
      <br />
      <br />
    </>
  );
}
