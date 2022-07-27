import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default function Order() {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [emailid, setEmailId] = useState("");
  const [pincode, setPincode] = useState("");
  const [form, setForm] = useState({
    bookname: "",
    authorname: "",
    desc: "",
    imgurl: "",
    price: "",
    ownermail:"",
    records: [],
  });
  const user=JSON.parse(localStorage.getItem("user"));
  const username=user.username;
  const userID=user._id;
  console.log(user.email);
  
  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`https://backend-rent-read.herokuapp.com/${params.id.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        
      })
  
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        toast.error(message);
        navigate("/signin");
        return;
      }
  
      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
  
      setForm(record);
      setEmailId(user.email)
    }
    
    fetchData();
  
    return;
  }, [params.id, navigate]);

  // const book = useSelector((state) => state.book.book);
  var bookname = form.bookname;
  var bookID = params.id;
  async function onSubmit(e) {
    e.preventDefault();
  
  
   const response = await fetch("https://backend-rent-read.herokuapp.com/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        name,
        number,
        emailid,
        address,
        pincode,
        userID,        
        username,
        bookID,
        bookname,
      }),
    }).then(res=>res.json())
    .then(data=>{
     if(data.error){
       toast.error(data.error)
     }else{
       toast.success("Order Successfully" );
     }
    })
  
   //  navigate("/");
  }




  // function auth(e) {
  //   e.preventDefault();
    // var mailid = form.ownermail;
    // var bookname = form.bookname;
    // var body =
    //   "You just got a order for your book " +
    //   bookname +
    //   "from " +
    //   name +
    //   ".\nFollowing are the details of your coustomer:\nCoustomer Name: " +
    //   name +
    //   "\nPhone Number: " +
    //   number +
    //   "\nCustomer Address: " +
    //   address +
    //   "\nPincode: " +
    //   pincode +
    //   "\nCustomer mailid: " +
    //   emailid;
    // var link =
    //   "mailto:" +
    //   mailid +
    //   "?cc=admin@rentandread.com" +
    //   "&subject=" +
    //   encodeURIComponent("Order for " + bookname) +
    //   "&body=" +
    //   encodeURIComponent(body);
    // window.location.href = link;
    // navigate("/sucess");
  // }
  return (
    <div>
      <div
        className="container card border-info shadow text-center"
        style={{ maxWidth: "25rem", minWidth: "10rem" }}
      >
        <div className="card-header">Enter Your Details </div>

        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setName(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter your Name"
                  value={name}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setNumber(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter your Phone Number"
                  value={number}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setEmailId(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter your Email Id"
                  value={emailid}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setAddress(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter your Address"
                  value={address}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setPincode(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter your Pincode"
                  value={pincode}
                />
              </div>

              <div className="mb-3">
                <input
                  type="submit"
                  className="btn btn-primary"
                  name="login"
                  value="Submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
      <br />
      <br />
    </div>
  );
}