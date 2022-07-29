import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(){
const navigate =useNavigate();
    function onSubmit(){
        localStorage.clear();
        navigate("/")
    }
  return(
    <div>
    <div className="container text-center card border-dark shadow" style={{ width: "25rem" }}>
 <div className="card-header">LOGOUT</div>
 <div className="card-body">
  <form onSubmit={onSubmit}>
  <l className="exclamationmark">!</l>
  <p>Are you sure you want to logout?</p><br/>
<div className="mb-3 form-group">
 <input
   type="submit"
   value="Logout"
   className="btn btn-primary"
 />
</div>

  </form>

 </div>
</div>
</div>
  );
        
   
}