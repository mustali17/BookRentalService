import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import StarRating from "star-rating-react";

const Record = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [returnAddress, setReturnAddress] = useState("");

  function MyVerticallyCenteredModal(props) {
    var userID;
    if (localStorage.length > 0) {
      const user = JSON.parse(localStorage.getItem("user"));
      userID = user._id;
    } else {
      console.log("empty");
      console.log("dcerj");
    }
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const handleReviewChange = (event) => {
      setReview(event.target.value);
    };
    const handleRatingChange = (newRating) => {
      setRating(newRating);
    };

    const handleReturnRequest = async () => {
      const response = await fetch(
        `https://rentandread.onrender.com/api/return/${props.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({ returnRequest: true }),
        }
      );

      const requestBody = {
        bookID: props.bookID,
        userId: userID,
        review: review,
        rating: rating,
      };

      const reviewResponse = await fetch(
        `https://rentandread.onrender.com/api/review/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok && reviewResponse.ok) {
        toast.success("Return requested and review added successfully!");
        setModalShow(false);
        window.location.reload();
      } else {
        toast.error("Failed to request return or add review!");
      }
    };
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
        <Modal.Body>
          <h4>Enjoyed Reading the book? Leave a Review:</h4>
          <div>
            <StarRating
              count={5}
              onChange={handleRatingChange}
              value={rating}
            />
          </div>
          <div>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Write your review here"
              value={review}
              onChange={handleReviewChange}
            />
          </div>
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
        id={props.record._id}
        bookID={props.record.bookID}
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
  }, []);

  function recordList() {
    return records.map((record) => {
      return <Record key={record._id} bookID={record.bookID} record={record} />;
    });
  }

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
          {records.length === 0 ? (
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
