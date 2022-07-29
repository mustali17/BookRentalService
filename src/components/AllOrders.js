import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
 
const Record = (props) => (
  
  <tr>
        <td><img src={props.record.imgurl} className="card-img-top" width="100" height="170" alt="..." /></td>
        <td>{props.record.bookname}</td>
        <td>{props.record.name}</td>
        <td>{props.record.phone}</td>
        <td>{props.record.email}</td>
        <td>{props.record.addr1}<br/>{props.record.addr2}<br/>{props.record.pin}<br/>{props.record.state}<br/>{props.record.country}</td>
        <td>₹{props.record.price}/-</td>
        <td style={{ color: "red" }}>Pending </td>
       
  </tr>
  
  
 
);
 
export default function AllOrders() {
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

     const response = await fetch("https://backend-rent-read.herokuapp.com/api/order", {
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
        All Orders:
      </h3>
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
        <th scope="col">Order Status</th>
      </tr>
    </thead>
        <tbody>
       {recordList()}
       </tbody>
     </table>
     </div>
     <ToastContainer />
   </div>
 );
}
