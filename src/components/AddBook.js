import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [image, setImage] = useState(null);

  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (image) {
      try {
        const imageRef = ref(storage, `/images/${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const formData = new FormData();
        formData.append("bookname", form.bookname);
        formData.append("authorname", form.authorname);
        formData.append("desc", form.desc);
        formData.append("price", form.price);
        formData.append("ownermail", form.ownermail);
        formData.append("image", downloadURL);

        const response = await fetch(
          "https://rentandread.onrender.com/api/record/add",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: formData,
          }
        );

        const data = await response.json();
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Book added Successfully");
          navigate("/books");
        }

        setForm({
          bookname: "",
          authorname: "",
          desc: "",
          price: "",
          ownermail: "",
          image: null,
        });
        setImage(null);
      } catch (err) {
        console.error("Error:", err);
        toast.error("Failed to add book");
      }
    } else {
      toast.error("Please upload an image");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full"
      >
        <div className="bg-[#1A936F] text-white text-center py-4">
          <h2 className="text-2xl font-bold">Add a Book</h2>
        </div>
        <div className="p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="bookname"
                className="block text-sm font-medium text-[#114B5F] mb-2"
              >
                Book Name
              </label>
              <input
                type="text"
                id="bookname"
                value={form.bookname}
                onChange={(e) => updateForm({ bookname: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A936F]"
                placeholder="Enter Book Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="authorname"
                className="block text-sm font-medium text-[#114B5F] mb-2"
              >
                Author Name
              </label>
              <input
                type="text"
                id="authorname"
                value={form.authorname}
                onChange={(e) => updateForm({ authorname: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A936F]"
                placeholder="Enter Author Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="desc"
                className="block text-sm font-medium text-[#114B5F] mb-2"
              >
                Description
              </label>
              <textarea
                id="desc"
                value={form.desc}
                onChange={(e) => updateForm({ desc: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A936F]"
                placeholder="Enter Description"
                rows="3"
                required
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-[#114B5F] mb-2"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                value={form.price}
                onChange={(e) => updateForm({ price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A936F]"
                placeholder="Enter Price"
                required
              />
            </div>
            <div>
              <label
                htmlFor="upload-photo"
                className="block text-sm font-medium text-[#114B5F] mb-2"
              >
                Book Image
              </label>
              <input
                type="file"
                id="upload-photo"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#1A936F] file:text-white hover:file:bg-[#114B5F]"
                accept="image/*"
                required
              />
            </div>
            <div>
              <label
                htmlFor="ownermail"
                className="block text-sm font-medium text-[#114B5F] mb-2"
              >
                Book Owner Email
              </label>
              <input
                type="email"
                id="ownermail"
                value={form.ownermail}
                onChange={(e) => updateForm({ ownermail: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A936F]"
                placeholder="Book Owner Email ID"
                required
              />
            </div>
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-2 bg-[#1A936F] text-white rounded-full hover:bg-[#114B5F] transition duration-300"
              >
                Add Book
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
}
