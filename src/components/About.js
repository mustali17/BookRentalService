import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function About() {
  const notify = () => {toast.success("Wow so easy!")};
  return (
    <div>
      <div id="about" className="container">
        <div className="row">
          <div className="col-sm-8">
            <h2>About Company Page</h2>
            <br />
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </h4>
            <br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
            <br />
            <button className="btn btn-outline-primary">Get in Touch</button>
            <div>
      <button onClick={notify} className="btn btn-outline-dark">Notify!</button>
      <ToastContainer />
    </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
