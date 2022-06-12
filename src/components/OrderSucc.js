import React from "react";

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
        <p>
          We received your purchase request;
          <br /> we'll be in touch shortly!
          <br />
          <br />
        </p>
      </div>
      <br />
      <br />
    </>
  );
}
