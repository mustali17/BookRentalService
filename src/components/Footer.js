import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-light text-center text-white">
        {/* <div className="container p-4 pb-0">
          <section className="mb-4">
            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#3b5998" }}
              href="https://www.facebook.com/"
              role="button"
            >
              <i className="bi bi-facebook"></i>
            </a>

            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#55acee" }}
              href="https://www.twitter.com/"
              role="button"
            >
              <i className="bi bi-twitter"></i>
            </a>

            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#dd4b39" }}
              href="https://www.google.com/"
              role="button"
            >
              <i className="bi bi-google"></i>
            </a>

            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#ac2bac" }}
              href="https://www.instagram.com/"
              role="button"
            >
              <i className="bi bi-instagram"></i>
            </a>

            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#0082ca" }}
              href="https://www.linkedin.com/"
              role="button"
            >
              <i className="bi bi-linkedin"></i>
            </a>
            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#333333" }}
              href="https://www.github.com/"
              role="button"
            >
              <i className="bi bi-github"></i>
            </a>
          </section>
        </div> */}

      {/* skill icons */}
      <p align="center" style={{height:"60px"}}>
    <a href="https://instagram.com">
    <img src ="https://skillicons.dev/icons?i=instagram"  height={"30px"} style={{margin:"15px 10px"}}/>
    </a>
    <a href="https://linkedin.com">
    <img src ="https://skillicons.dev/icons?i=linkedin"  height={"30px"} style={{margin:"15px 10px"}}/>
    </a>
    <a href="https://github.com">
    <img src ="https://skillicons.dev/icons?i=github"  height={"30px"} style={{margin:"15px 10px"}}/>
    </a>
    {/* <a href="https://google.com">
    <img src ="https://skillicons.dev/icons?i=gcp"  height={"30px"} style={{margin:"15px 10px"}}/>
    </a> */}
    <a href="https://dicord.com">
    <img src ="https://skillicons.dev/icons?i=discord"  height={"30px"} style={{margin:"15px 10px"}}/>
    </a>
    <a href="https://twitter.com">
    <img src ="https://skillicons.dev/icons?i=twitter"  height={"30px"} style={{margin:"15px 10px"}}/>
    </a>

</p>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" ,color:"black"}}
        >
          &copy; 2023 Rent&Read. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
