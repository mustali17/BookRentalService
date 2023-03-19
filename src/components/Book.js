import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdsComponent from "./AdsComponent";

const Record = (props) => (
  <div>
    <div className="col">
      <div className="container card border shadow" style={{ width: "18rem" }}>
        <img
          src={require(`./books/${props.record.imgurl}.jpg`)}
          className="card-img-top"
          width="100"
          height="170"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.record.bookname}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {props.record.authorname}
          </h6>
          <p className="card-text mb-2" style={{ color: "green" }}>
            ₹{props.record.price}/pm
          </p>
          <Link
            className="btn btn-primary"
            to={`/books/cart/${props.record._id}`}
          >
            Rent Now!{" "}
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        "https://rentandread.onrender.com/api/record"
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText} Please Refresh this page`;
        toast.error(message);
        setIsLoading(false);
        if (!isReloaded) {
          isReloaded = true;
          setTimeout(() => window.location.reload(false), 1000); // reload after 1 second
        }
        return;
      }

      const records = await response.json();
      setRecords(records);
      setIsLoading(false); // set isLoading to false once data is fetched
    }

    getRecords();

    return;
  }, [records.length]);

  // This method will delete a record
  // async function deleteRecord(id) {
  //   await fetch(`https://rentandread.onrender.com/api/${id}`, {
  //     method: "DELETE",
  //   });

  //   const newRecords = records.filter((el) => el._id !== id);
  //   setRecords(newRecords);
  // }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          // deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3 style={{ textAlign: "center", fontFamily: "yellowtail" }}>
        View Books:
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
          <div className="row row-cols-1 row-cols-md-3 g-2">{recordList()}</div>
        </div>
      )}
      <AdsComponent />
      <ToastContainer />
    </div>
  );
}
