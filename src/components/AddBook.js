import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
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
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("https://backend-rent-read.herokuapp.com/api/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ bookname: "", authorname: "", desc: "" ,price: "", imgurl: "",ownermail: ""});
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
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
     </div>
     </div>
   </div>
 );
}
