import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";

 
export default function Cart() {
 const [form, setForm] = useState({
   bookname: "",
   authorname: "",
   desc: "",
   imgurl: "",
   price: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`https://rentandread.onrender.com/api/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 return (
   <div>
     <div className="container text-center">
        <div className="card mb-3 border-primary" style={{ maxWidth: "540px" }}>
          <div className="row g-0">
          <div className="col-md-4">
              <img src={form.imgurl} className="img-fluid rounded-start" alt="..." />
            </div>
          <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{form.bookname}</h5>
                <p className="card-text">{form.authorname}</p>
                <p className="card-text">
                  <small className="text-muted">{form.desc}</small>
                </p>
                <p className="card-text">₹ {form.price} /per month</p>
                <Link to={`/books/order/${params.id}`}>
                  <button className="btn btn-primary">Rent Book</button>
                </Link>
              </div>
           </div> 
          </div>
        </div>
      </div>
     
   </div>
 );
}