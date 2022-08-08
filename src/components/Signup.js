import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
export default function SignUp() {
 const [form, setForm] = useState({
   name: "",
   lname:"",
   username: "",
   email: "",
   password: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
   
   
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   const response = await fetch("https://backend-rent-read.herokuapp.com/api/user/signup", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       "Authorization":"Bearer "+localStorage.getItem("jwt"),

     },
     body: JSON.stringify(newPerson),
   }).then(res=>res.json())
   .then(data=>{
    if(data.error){
      toast.error(data.error)
    }else{
      toast.success("User Created Successfully" );
    }
   })
   

 
   setForm({ name: "",lname: "", username: "", email: "" ,password: ""});
   

 }



 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <div className="container text-center card border-dark shadow">
         <div className="card-header">FILL YOUR DETAILS</div>
         <div className="card-body">
     <form onSubmit={onSubmit}>
       {/* <div className="mb-3 form-group">
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           placeholder="Enter Your Name"
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div> */}
       <div className="row mb-3">
                <div className="col-md-6">
                  {/* <label className="labels">Name</label> */}
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="First name"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  {/* <label className="labels">Surname</label> */}
                  <input
                    type="text"
                    className="form-control"
                    value={form.lname}
                    onChange={(e) => updateForm({ lname: e.target.value })}
                    placeholder="Last name"
                  />
                </div>
              </div>
       <div className="mb-3 form-group">
         <input
           type="text"
           className="form-control"
           id="username"
           value={form.username}
           placeholder="Enter User Name"
           onChange={(e) => updateForm({ username: e.target.value })}
         />
       </div>
       <div className="mb-3 form-group">
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           placeholder="Enter your Mail ID"
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="mb-3 form-group">
         <input
           type="password"
           className="form-control"
           id="password"
           value={form.password}
           placeholder="Enter Password"
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
       
       
      
       <div className="mb-3 form-group">
         <input
           type="submit"
           value="Sign Up"
           className="btn btn-primary"
         />
       </div>
       <h6><Link to="/signin">Already have an account?</Link></h6>
     </form>
     <ToastContainer />
     </div>
     </div>
     
   </div>
 );
}
