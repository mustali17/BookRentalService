import React from "react";
import { useNavigate,Link } from "react-router-dom";


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
<div className="row mb-3 form-group">
  <div className="col">
 <input
   type="submit"
   value="Logout"
   className="btn btn-primary"
 />
 </div>
 <div className="col">
 <Link to="/">
            <button type="button" className="btn btn-outline-primary">
              Cancel
            </button>
          </Link>
          </div>
</div>


  </form>

 </div>
</div>
</div>
  );
        
   
}