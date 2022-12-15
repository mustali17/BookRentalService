import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
 
export default function AddBook() {
 const [form, setForm] = useState({
   bookname: "",
   authorname: "",
   desc: "",
   price: "",
   imgurl: "",
   ownermail: "",
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
 
   const newPerson = { ...form };
 
  const response = await fetch("https://rentandread.onrender.com/api/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       "Authorization":"Bearer "+localStorage.getItem("jwt")
     },
     body: JSON.stringify(newPerson),
   })
   .then(res=>res.json())
    .then(data=>{
     if(data.error){
       toast.error(data.error)
     }else{
       toast.success("Book added Successfully" );
       navigate("/books")
     }
    })
 
   setForm({ bookname: "", authorname: "", desc: "" ,price: "", imgurl: "",ownermail: ""});
  //  navigate("/");
 }
 
 return (
   <div>
     <div className="container text-center card border-dark shadow">
         <div className="card-header">Add a Book</div>
         <div className="card-body">
     <form onSubmit={onSubmit}>
       <div className="mb-3 form-group">
         <input
           type="text"
           className="form-control"
           id="bookname"
           value={form.bookname}
           placeholder="Enter Book Name"
           onChange={(e) => updateForm({ bookname: e.target.value })}
         />
       </div>
       <div className="mb-3 form-group">
         <input
           type="text"
           className="form-control"
           id="authorname"
           value={form.authorname}
           placeholder="Enter Author Name"
           onChange={(e) => updateForm({ authorname: e.target.value })}
         />
       </div>
       <div className="mb-3 form-group">
         <input
           type="text"
           className="form-control"
           id="desc"
           value={form.desc}
           placeholder="Enter Description"
           onChange={(e) => updateForm({ desc: e.target.value })}
         />
       </div>
       <div className="mb-3 form-group">
         <input
           type="text"
           className="form-control"
           id="price"
           value={form.price}
           placeholder="Enter Price"
           onChange={(e) => updateForm({ price: e.target.value })}
         />
       </div>
       <div className="mb-3 form-group">
         <input
           type="text"
           className="form-control"
           id="imgurl"
           value={form.imgurl}
           placeholder="Enter Image URL"
           onChange={(e) => updateForm({ imgurl: e.target.value })}
         />
       </div>
       <div className="mb-3 form-group">
         <input
           type="text"
           className="form-control"
           id="ownermail"
           value={form.ownermail}
           placeholder="Book Owner Mail ID"
           onChange={(e) => updateForm({ ownermail: e.target.value })}
         />
       </div>
       <div className="mb-3 form-group">
         <input
           type="submit"
           value="Add Book"
           className="btn btn-primary"
         />
       </div>
     </form>
     <ToastContainer />

     </div>
     </div>
   </div>
 );
}
