import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(){
    const navigate=useNavigate();
    
        
        // localStorage.clear();
        navigate("/signin");
        
   
}