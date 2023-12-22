import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const AllUsers = () => {
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
        "http://rentandread.centralindia.cloudapp.azure.com:5000/api/getusers"
      );
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [refreshTable]);

  const handleToggleBlocked = async (id, blocked) => {
    try {
      const response = await axios.put(
        `http://rentandread.centralindia.cloudapp.azure.com:5000/api/${id}`,
        {
          blocked: !blocked,
        }
      );
      const updatedUser = response.data;

      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://rentandread.centralindia.cloudapp.azure.com:5000/api/delete/${id}`
      );
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      toast.error("User Deleted");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Welcome, Admin!</h2>
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
                Username
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Name
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Email
              </th>

              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Blocked
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Action
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
                  {user.username}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.email}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.blocked ? "Yes" : "No"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: "4px",
                      border: "none",
                      backgroundColor: user.blocked ? "#f44336" : "#4caf50",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => handleToggleBlocked(user._id, user.blocked)}
                  >
                    {user.blocked ? "Unblock" : "Block"}
                  </button>
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

export default AllUsers;
