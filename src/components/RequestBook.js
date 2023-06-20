import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RequestBook() {
  const [form, setForm] = useState({
    bookname: "",
    authorname: "",
    desc: "",
    email: "",
  });
  const navigate = useNavigate();
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bookname", form.bookname);
    formData.append("authorname", form.authorname);
    formData.append("desc", form.desc);
    formData.append("email", form.email);

    const response = await fetch("http://localhost:5000/api/request/add", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Book request Successfully");
          navigate("/books");
        }
      });

    setForm({
      bookname: "",
      authorname: "",
      desc: "",
      email: "",
    });
  }

  return (
    <div>
      <div className="container text-center card border-dark shadow">
        <div className="card-header">Request a Book</div>
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
                id="email"
                value={form.email}
                placeholder="Your Mail ID"
                onChange={(e) => updateForm({ email: e.target.value })}
              />
            </div>
            <div className="mb-3 form-group">
              <input
                type="submit"
                value="Request Book"
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
