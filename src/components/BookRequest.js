import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const BookRequest = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminLogin = localStorage.getItem("adminLogin");
    if (!adminLogin) {
      navigate("/");
      return;
    }
  }, [navigate]);
  const [users, setUsers] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://rentandread.onrender.com/api/getbookrequest"
      );
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [refreshTable]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://rentandread.onrender.com/api/deleterequest/${id}`
      );
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      toast.error("Book Deleted");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Books Requested by users: </h2>
      <div>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Book Name
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Author Name
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Book Description
              </th>

              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                User Email
              </th>

              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.bookname}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.authorname}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.desc}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.email}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: "4px",
                      border: "none",
                      backgroundColor: "#f44336",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />

      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default BookRequest;
