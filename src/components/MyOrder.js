import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
 
const Record = (props) => (
 <div>
  <div className="card w-75">
  <img src={props.record.imgurl} className="card-img-top" width="100" height="170" alt="..." />

  <div className="card-body">
  <h5 className="card-title">{props.record.bookname}</h5>
  <h6 className="card-subtitle mb-2 text-muted">Order Status : </h6>
  <h6 className="card-subtitle mb-2 text-muted">Order Date: {props.record.FDate}</h6>
  <h6 className="card-subtitle mb-2 text-muted">Price: ₹{props.record.price}/-</h6>
  </div>
  </div><br/>
  </div>
 
);
 
export default function MyOrder() {
 const [records, setRecords] = useState([]);
 var userID;
  if(localStorage.length>0){
    const user=JSON.parse(localStorage.getItem("user"));
    userID=user._id;
  }else{
console.log("empty");
console.log("dcerj");
  }  
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {

     const response = await fetch(`https://backend-rent-read.herokuapp.com/api/order/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      
    })
    if (!response.ok) {
      toast.error("You must be logged in!")
      navigate("/signin");
      return;
    }
 
   
 
     const records = await response.json();
     setRecords(records);
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
        My Orders:
      </h3>
     <div className="container" style={{ alignItems: "center" }}>
       {recordList()}
       
     </div>
     <ToastContainer />
   </div>
 );
}
