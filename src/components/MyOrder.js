import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Record = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [returnAddress, setReturnAddress] = useState("");

  const handleReturnRequest = async () => {
    const response = await fetch(
      `https://rentandread.onrender.com/api/return/${props.record._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ returnRequest: true }),
      }
    );
    if (response.ok) {
      toast.success("Return requested successfully!");
      setModalShow(false);
      window.location.reload();
    } else {
      toast.error("Failed to request return!");
    }
  };
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Request Return
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Please return the book to the following address:</h4>
          <p>
            Your Name
            <br />
            Your Address
            <br />
            Your City, State Zip
            <br />
            Your Country
            <br />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <button className="btn btn-primary" onClick={handleReturnRequest}>
            Request Return
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
  return (
    <div>
      <div className="card w-75">
        <img
          src={require(`./books/${props.record.imgurl}`)}
          className="card-img-top"
          width="100"
          height="170"
          alt="..."
        />

        <div className="card-body">
          <h5 className="card-title">{props.record.bookname}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Order Date: {props.record.FDate}
          </h6>
          {/* <h6 className="card-subtitle mb-2 text-muted"> */}
          {/* Days Remaining: {Math.floor((Math.floor(new Date(Date.parse(props.record.RDate)).getTime() / 1000) - Math.floor(new Date().getTime() / 1000)) / 86400);} */}
          {/* {new Date(Date.parse("23/06/2023"))}
        </h6> */}
          <h6 className="card-subtitle mb-2 text-muted">
            Return Due Date: {props.record.RDate}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">
            Price: ₹{props.record.price}/-
          </h6>
          {props.record.bookDelivered ? (
            <>
              {props.record.bookReturend ? (
                "Book Returned"
              ) : (
                <>
                  {props.record.returnRequest ? (
                    "Return Request Sent!"
                  ) : (
                    <button
                      className="btn btn-primary profile-button"
                      type="button"
                      onClick={() => setModalShow(true)}
                    >
                      Request Return
                    </button>
                  )}
                </>
              )}
            </>
          ) : (
            "Order Status: In Transit"
          )}
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <br />
    </div>
  );
};

export default function MyOrder() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  var userID;
  if (localStorage.length > 0) {
    const user = JSON.parse(localStorage.getItem("user"));
    userID = user._id;
  } else {
    console.log("empty");
    console.log("dcerj");
  }
  // This method fetches the records from the database.
  async function getRecords() {
    const response = await fetch(
      `https://rentandread.onrender.com/api/order/${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
    if (!response.ok) {
      toast.error("You must be logged in!");
      setIsLoading(false);
      navigate("/signin");
      return;
    }

    const records = await response.json();
    setRecords(records);
    setIsLoading(false);
  }
  useEffect(() => {
    getRecords();

    return;
  }, []);

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          //  key={_id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3 style={{ textAlign: "center", fontFamily: "yellowtail" }}>
        My Orders:
      </h3>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container" style={{ alignItems: "center" }}>
          {records.length == 0 ? (
            <>
              <h5>You don't have any orders yet! </h5>
              <Link to="/books">
                <button type="button" className="btn btn-outline-primary">
                  Explore Books
                </button>
              </Link>
            </>
          ) : (
            <>{recordList()}</>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
