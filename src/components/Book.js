import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
 
const Record = (props) => (
 <div>
  <div className="col">
  <div className="container card border shadow" style={{ width: "18rem" }}>
  <img src={props.record.imgurl} className="card-img-top" width="100" height="170" alt="..." />
  <div className="card-body">
  <h5 className="card-title">{props.record.bookname}</h5>
  <h6 className="card-subtitle mb-2 text-muted">{props.record.authorname}</h6>
  <p className="card-text mb-2" style={{ color: "green" }}>₹{props.record.price}/pm</p>
  <Link className="btn btn-primary" to={`/books/cart/${props.record._id}`}>Rent Now! </Link>
  </div>
  </div>
  </div>
  </div>
 
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {

     const response = await fetch('https://backend-rent-read.herokuapp.com/api/record');

 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       toast.error(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`https://backend-rent-read.herokuapp.com/api/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
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
     <div className="container" style={{ alignItems: "center" }}>
        <div class="row row-cols-1 row-cols-md-3 g-2">
       {recordList()}
       </div>
     </div>
     <ToastContainer />
   </div>
 );
}
