import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Record = (props) => {
  const handleBookRecieved = async () => {
    console.log(props.record._id);
    const response = await fetch(
      `http://rentandread.centralindia.cloudapp.azure.com:5000/api/bookrecieved/${props.record._id}/${props.record.bookID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ bookReturend: true }),
      }
    );
    if (response.ok) {
      toast.success("Book Recieved successfully!");
      window.location.reload();
    } else {
      toast.error("Failed to Recieve book!");
    }
  };
  const handleBookDelivered = async () => {
    const response = await fetch(
      `http://rentandread.centralindia.cloudapp.azure.com:5000/api/bookdelivered/${props.record._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ bookDelivered: true }),
      }
    );
    if (response.ok) {
      toast.success("Book Delivered successfully!");
      window.location.reload();
    } else {
      toast.error("Failed to Delivered book!");
    }
  };
  return (
    <tr>
      <td>
        <img
          src={props.record.imgurl}
          className="card-img-top"
          width="100"
          height="170"
          alt="..."
        />
      </td>
      <td>{props.record.bookname}</td>
      <td>{props.record.name}</td>
      <td>{props.record.phone}</td>
      <td>{props.record.email}</td>
      <td>
        {props.record.addr1}
        <br />
        {props.record.addr2}
        <br />
        {props.record.pin}
        <br />
        {props.record.state}
        <br />
        {props.record.country}
      </td>
      <td>₹{props.record.price}/-</td>
      <td>{props.record.FDate}</td>
      <td>{props.record.RDate}</td>
      <td>
        {props.record.bookDelivered ? (
          <>
            {props.record.bookReturend ? (
              "Book Returned!"
            ) : (
              <>
                Return Request:{" "}
                {props.record.returnRequest ? (
                  <>
                    <span style={{ color: "green" }}>Yes</span>
                  </>
                ) : (
                  <span style={{ color: "red" }}>No</span>
                )}
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                  disabled={!props.record.returnRequest}
                  onClick={handleBookRecieved}
                >
                  Book Recieved
                </button>
              </>
            )}
          </>
        ) : (
          <button
            className="btn btn-primary profile-button"
            type="button"
            onClick={handleBookDelivered}
          >
            Book Delivered
          </button>
        )}
      </td>
    </tr>
  );
};

export default function AllOrders() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // This method fetches the records from the database.
  useEffect(() => {
    const adminLogin = localStorage.getItem("adminLogin");
    if (!adminLogin) {
      toast.error("You are not authorized to access this page.");
      navigate("/"); // Redirect to home page or login page
      return;
    }
    async function getRecords() {
      const response = await fetch(
        "http://rentandread.centralindia.cloudapp.azure.com:5000/api/order",
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

    getRecords();

    return;
  }, [records.length]);

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
        All Orders:
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
        <div className="card">
          <table className="table table-striped table-bordered table-hover bg-white">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Book Name</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email ID</th>
                <th scope="col">Address</th>
                <th scope="col">Rent Price</th>
                <th scope="col">Order Date</th>
                <th scope="col">Return Date</th>
                <th scope="col">Order Status</th>
              </tr>
            </thead>
            <tbody>{recordList()}</tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
