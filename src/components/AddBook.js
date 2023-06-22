import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./firebase";

export default function AddBook() {
  const [form, setForm] = useState({
    bookname: "",
    authorname: "",
    desc: "",
    price: "",
    imgurl: null,
    ownermail: "",
  });
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  const [imglink, setimglink] = useState("");

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    if (image) {
      const imageRef = ref(storage, `/images/${image.name}`);
      uploadBytes(imageRef, image)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              // Once image is uploaded, get the download URL
              console.log("Image URL:", downloadURL);
              setimglink(downloadURL);
              const formData = new FormData();
              formData.append("bookname", form.bookname);
              formData.append("authorname", form.authorname);
              formData.append("desc", form.desc);
              formData.append("price", form.price);
              formData.append("ownermail", form.ownermail);
              formData.append("image", downloadURL);

              const response = fetch(
                "https://rentandread.onrender.com/api/record/add",
                {
                  method: "POST",
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                  },
                  body: formData,
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  if (data.error) {
                    toast.error(data.error);
                  } else {
                    toast.success("Book added Successfully");
                    navigate("/books");
                  }
                });

              setForm({
                bookname: "",
                authorname: "",
                desc: "",
                price: "",
                ownermail: "",
                image: null,
              });
            })
            .catch((err) => {
              console.error("Error getting download URL from Firebase", err);
            });
        })
        .catch((err) => {
          console.error("Error uploading image to Firebase Storage", err);
        });
    }
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
              <label htmlFor="upload-photo" className="btn btn-primary">
                Upload Book Image
              </label>
              <input
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
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
